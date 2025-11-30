package com.personalchat.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.personalchat.backend.dto.CreateRoomRequest;
import com.personalchat.backend.entity.ChatRoom;
import com.personalchat.backend.entity.User;
import com.personalchat.backend.repositories.ChatRoomRepo;
import com.personalchat.backend.repositories.UserRepo;
import com.personalchat.backend.service.ChatRoomServiceImpl;
import com.personalchat.backend.service.UserServiceImpl;

@CrossOrigin(origins = "https://chat-verse-frontend-seven.vercel.app/", allowCredentials = "true")
@RequestMapping("/user")
@RestController
public class UserController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ChatRoomRepo chatRoomRepo;

    @Autowired
    private ChatRoomServiceImpl chatRoomService;

    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getProfile(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 1. Get all chat rooms for the current user
    @GetMapping("/rooms/{userPhoneNumber}")
    public ResponseEntity<List<ChatRoom>> getChatRooms(@PathVariable Long userPhoneNumber) {
        System.out.println("Fetching chat rooms for user ID: " + userPhoneNumber);
        System.out.println("1");
//        User user = userRepo.findByPhoneNumber(userPhoneNumber).orElse(null);
        User user = userService.getUserByPhoneNumber(String.valueOf(userPhoneNumber));
        if (user == null) {
            System.out.println("2");
            return ResponseEntity.notFound().build();
        }
        List<ChatRoom> rooms = chatRoomService.getAllChatRoomsByUsers(user);
        System.out.println( "Rooms (UserController) : " + rooms);
        System.out.println("4");
        return ResponseEntity.ok(rooms);
    }

//    // 2. Get messages for a selected chat room
//    @GetMapping("/rooms/{senderPhoneNumber}/{chatRoomId}/messages")
//    public ResponseEntity<List<Message>> getMessages(@PathVariable Long senderPhoneNumber ,@PathVariable Long chatRoomId) {
//        List<Message> messages = chatRoomService.getMessagesByChatRoomId(senderPhoneNumber, chatRoomId);
//        return ResponseEntity.ok(messages);
//    }

    // New: create (or return existing) chat room for two participants
//    @PostMapping("/rooms/create")
//    public ResponseEntity<?> createChatRoom(@RequestBody Map<String, Object> payload) {
//        // Expect participant1PhoneNumber and participant2PhoneNumber in payload
//        Object p1 = payload.get("participant1PhoneNumber");
//        Object p2 = payload.get("participant2PhoneNumber");
//        if (p1 == null || p2 == null) {
//            return ResponseEntity.badRequest().body(Map.of("error", "participant1PhoneNumber and participant2PhoneNumber are required"));
//        }
//        Long phone1;
//        Long phone2;
//        try {
//            phone1 = Long.parseLong(String.valueOf(p1));
//            phone2 = Long.parseLong(String.valueOf(p2));
//        } catch (NumberFormatException e) {
//            return ResponseEntity.badRequest().body(Map.of("error", "Invalid phone number format"));
//        }
//
//        User user1 = userRepo.findByPhoneNumber(phone1).orElse(null);
//        User user2 = userRepo.findByPhoneNumber(phone2).orElse(null);
//        if (user1 == null || user2 == null) {
//            return ResponseEntity.notFound().build();
//        }
//
//        // Check if a chatroom already exists with exactly these two users
//        List<ChatRoom> existing = chatRoomRepo.findAll();
//        for (ChatRoom cr : existing) {
//            if (cr.getUsers() != null && cr.getUsers().size() == 2 && cr.getUsers().contains(user1) && cr.getUsers().contains(user2)) {
//                return ResponseEntity.ok(cr);
//            }
//        }
//
//        // Create new chat room
//        ChatRoom chatRoom = new ChatRoom();
//        chatRoom.setName(user1.getDisplayName() + " & " + user2.getDisplayName());
//        java.util.Set<User> set = new java.util.HashSet<>();
//        set.add(user1);
//        set.add(user2);
//        chatRoom.setUsers(set);
//        ChatRoom saved = chatRoomRepo.save(chatRoom);
//        return ResponseEntity.ok(saved);
//    }

    // Public search endpoint under /user/search/{phoneNumber} (GET is permitted in SecurityConfig)
    @GetMapping("/search/{phoneNumber}")
    public ResponseEntity<?> searchUserByPhoneNumber(@PathVariable Long phoneNumber) {
        User user = userService.searchByPhoneNumber(phoneNumber);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        Map<String, Object> resp = Map.of(
                "id", user.getId(),
                "displayName", user.getDisplayName(),
                "phoneNumber", user.getPhoneNumber(),
                "status", user.getStatus(),
                "role", user.getRole()
        );
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/rooms/create")
    public ResponseEntity<ChatRoom> createRoom(@RequestBody CreateRoomRequest request) {
        ChatRoom room = chatRoomService.getOrCreatePrivateRoom(
                request.getParticipant1PhoneNumber(),
                request.getParticipant2PhoneNumber()
        );

        return ResponseEntity.ok(room);
    }

//    @GetMapping("/room/{roomId}/messages")
//    public ResponseEntity<List<Message>> getMessages(
//            @PathVariable Long roomId,
//            @RequestParam(value ="page", defaultValue = "0", required = false) int page,
//            @RequestParam(value = "size", defaultValue = "20", required = false) int size
//    ) {
//
////        Get Messages
//        List<Message> messages = chatRoomService.getMessagesByChatRoomId(roomId);
//
////        Pagination
//        int start = Math.max(0, messages.size() - (page + 1) * size);
//        int end = Math.min(messages.size(), start + size);
//        List<Message> paginatedMessages = messages.subList(start, end);
//
//        return ResponseEntity.ok(paginatedMessages);
//    }

}
