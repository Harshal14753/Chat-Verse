package com.personalchat.backend.controller;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.personalchat.backend.dto.MessageRequest;
import com.personalchat.backend.entity.Message;
import com.personalchat.backend.repositories.MessageRepo;

@Controller
public class ChatController {

    @Autowired
    private MessageRepo messageRepo;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // in-memory map tracking which room each user currently has selected
    private final ConcurrentMap<String, Long> userSelectedRoom = new ConcurrentHashMap<>();

    @MessageMapping("/sendMessage/{roomId}")     // on that api message sends
    @SendTo("/topic/room/{roomId}")    // subscribe webSocketClient here
    public Message sendMessage(
            @DestinationVariable Long roomId,
            @Payload MessageRequest request
    ) {

        Message message = new Message();
        message.setContent(request.getContent());
        message.setChatRoomId(roomId);
        message.setSenderPhoneNumber(request.getSenderPhoneNumber());
        message.setTimestamp(LocalDateTime.now());
        // default status SENT
        message.setStatus("SENT");
        try {
            messageRepo.save(message);
            
            // Auto-deliver: If recipient is currently viewing this room, mark as DELIVERED immediately
            boolean recipientViewing = userSelectedRoom.entrySet().stream()
                    .anyMatch(e -> !e.getKey().equals(String.valueOf(request.getSenderPhoneNumber())) && e.getValue().equals(roomId));
            
            if (recipientViewing) {
                // Update to DELIVERED and broadcast again
                message.setStatus("DELIVERED");
                messageRepo.save(message);
                messagingTemplate.convertAndSend("/topic/room/" + roomId, message);
                System.out.println("✓ Auto-marked as DELIVERED: " + message.getId());
                
                // Auto-read: If recipient is viewing, also mark as READ immediately
                message.setStatus("READ");
                messageRepo.save(message);
                System.out.println("✓ Auto-marked as READ: " + message.getId());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error saving message: " + e.getMessage());
        }
        return message;
    }

    @PostMapping("/chat/send")
    @ResponseBody
    public Message sendMessageRest(@RequestBody MessageRequest request) {
        Message message = new Message();
        message.setContent(request.getContent());
        message.setChatRoomId(request.getChatRoomId());
        message.setSenderPhoneNumber(request.getSenderPhoneNumber());
        message.setTimestamp(LocalDateTime.now());
        // default status SENT
        message.setStatus("SENT");
        try {
            messageRepo.save(message);
            
            // Broadcast the message with SENT status first
            messagingTemplate.convertAndSend("/topic/room/" + message.getChatRoomId(), message);
            System.out.println("✓ Broadcast message with SENT status: " + message.getId());
            
            // Check if recipient is currently viewing this room
            boolean recipientViewing = userSelectedRoom.entrySet().stream()
                    .anyMatch(e -> !e.getKey().equals(String.valueOf(request.getSenderPhoneNumber())) && e.getValue().equals(request.getChatRoomId()));
            
            if (recipientViewing) {
                // Update to DELIVERED
                message.setStatus("DELIVERED");
                messageRepo.save(message);
                messagingTemplate.convertAndSend("/topic/room/" + message.getChatRoomId(), message);
                System.out.println("✓ Auto-marked as DELIVERED: " + message.getId());
                
                // Update to READ (since recipient is viewing)
                message.setStatus("READ");
                messageRepo.save(message);
                messagingTemplate.convertAndSend("/topic/room/" + message.getChatRoomId(), message);
                System.out.println("✓ Auto-marked as READ: " + message.getId());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error saving message: " + e.getMessage());
        }
        return message;
    }

    @GetMapping("/user/room/{roomId}/messages")
    @ResponseBody
    public List<Message> getMessagesForRoom(@PathVariable Long roomId,
                                            @RequestParam(defaultValue = "50") int size,
                                            @RequestParam(defaultValue = "0") int page) {
        List<Message> all = messageRepo.findByChatRoomIdOrderByTimestampAsc(roomId);
        if (all == null || all.isEmpty()) return Collections.emptyList();
        int from = page * size;
        if (from >= all.size()) return Collections.emptyList();
        int to = Math.min(from + size, all.size());
        return all.subList(from, to);
    }

    @PutMapping("/user/room/{roomId}/messages/{messageId}/read")
    @ResponseBody
    public Message markMessageAsRead(@PathVariable Long roomId,
                                     @PathVariable String messageId) {
        try {
            Message message = messageRepo.findById(messageId).orElseThrow(
                    () -> new RuntimeException("Message not found: " + messageId)
            );
            if (!message.getChatRoomId().equals(roomId)) {
                throw new RuntimeException("Message does not belong to this room");
            }
            message.setStatus("READ");
            messageRepo.save(message);
            // Broadcast the status update to WebSocket subscribers
            messagingTemplate.convertAndSend("/topic/room/" + roomId, message);
            return message;
        } catch (Exception e) {
            throw new RuntimeException("Error marking message as read: " + e.getMessage());
        }
    }

    @MessageMapping("/selectRoom/{roomId}")
    public void selectRoom(@DestinationVariable Long roomId, @Payload Map<String, String> payload) {
        if (payload == null) return;
        String phone = payload.get("phoneNumber");
        if (phone == null) return;
        try {
            if (roomId == null || roomId <= 0) {
                userSelectedRoom.remove(phone);
            } else {
                userSelectedRoom.put(phone, roomId);
            }
        } catch (Exception e) {
            System.err.println("Failed to set selected room for user: " + e.getMessage());
        }
    }

    @MessageMapping("/delivered/{roomId}")
    public void markMessageAsDelivered(@DestinationVariable Long roomId,
                                       @Payload Map<String, String> payload) {
        String messageId = payload != null ? payload.get("messageId") : null;
        String receiverPhone = payload != null ? payload.get("receiverPhoneNumber") : null;
        
        if (messageId == null) {
            System.err.println("markMessageAsDelivered: missing messageId");
            return;
        }
        
        try {
            Message message = messageRepo.findById(messageId).orElseThrow(
                    () -> new RuntimeException("Message not found: " + messageId)
            );
            
            if (!message.getChatRoomId().equals(roomId)) {
                System.err.println("markMessageAsDelivered: message does not belong to room");
                return;
            }
            
            // Don't update if sender is calling this (only recipient should mark as delivered)
            if (receiverPhone != null && receiverPhone.equals(String.valueOf(message.getSenderPhoneNumber()))) {
                return;
            }
            
            // Only move to DELIVERED if it's currently SENT
            if ("SENT".equals(message.getStatus())) {
                message.setStatus("DELIVERED");
                messageRepo.save(message);
                // Broadcast status update to all subscribers
                messagingTemplate.convertAndSend("/topic/room/" + roomId, message);
                System.out.println("✓✓ Marked as DELIVERED via WebSocket: " + messageId);
            }
        } catch (Exception e) {
            System.err.println("Error marking message delivered: " + e.getMessage());
        }
    }

    @MessageMapping("/read/{roomId}")
    public void markMessagesAsRead(@DestinationVariable Long roomId,
                                   @Payload Map<String, Object> payload) {
        if (payload == null) {
            System.err.println("markMessagesAsRead: missing payload");
            return;
        }
        
        @SuppressWarnings("unchecked")
        List<String> messageIds = (List<String>) payload.get("messageIds");
        String receiverPhone = (String) payload.get("receiverPhoneNumber");
        
        if (messageIds == null || messageIds.isEmpty()) {
            System.err.println("markMessagesAsRead: missing messageIds");
            return;
        }
        
        try {
            for (String messageId : messageIds) {
                Message message = messageRepo.findById(messageId).orElse(null);
                if (message == null) {
                    System.err.println("markMessagesAsRead: message not found: " + messageId);
                    continue;
                }
                
                if (!message.getChatRoomId().equals(roomId)) {
                    System.err.println("markMessagesAsRead: message does not belong to room");
                    continue;
                }
                
                // Don't update if sender is calling this (only recipient should mark as read)
                if (receiverPhone != null && receiverPhone.equals(String.valueOf(message.getSenderPhoneNumber()))) {
                    continue;
                }
                
                // Update status to READ (from any previous status)
                if (!"READ".equals(message.getStatus())) {
                    message.setStatus("READ");
                    messageRepo.save(message);
                    
                    // Broadcast status update via WebSocket to all subscribers
                    messagingTemplate.convertAndSend("/topic/room/" + roomId, message);
                    System.out.println("🔵🔵 Marked as READ via WebSocket: " + messageId);
                }
            }
        } catch (Exception e) {
            System.err.println("Error marking messages as read: " + e.getMessage());
        }
    }

}

