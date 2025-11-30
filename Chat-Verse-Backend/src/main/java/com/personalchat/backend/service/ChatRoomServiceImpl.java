package com.personalchat.backend.service;

import com.personalchat.backend.entity.ChatRoom;
import com.personalchat.backend.entity.Message;
import com.personalchat.backend.entity.User;
import com.personalchat.backend.repositories.ChatRoomRepo;
import com.personalchat.backend.repositories.MessageRepo;
import com.personalchat.backend.repositories.UserRepo;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ChatRoomServiceImpl implements ChatRoomService {

    @Autowired
    private ChatRoomRepo chatRoomRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private MessageRepo messageRepo;

    @Override
    public List<Message> getMessagesByChatRoomId(Long chatRoomId) {
//        System.out.println("3");
        return messageRepo.findByChatRoomIdOrderByTimestampAsc(chatRoomId);
    }

    @Override
    public List<ChatRoom> getAllChatRoomsByUsers(User user) {
        System.out.println("3");
        return chatRoomRepo.findByUsers_PhoneNumber(user.getPhoneNumber());
    }

    public ChatRoom getOrCreatePrivateRoom(Long phone1, Long phone2) {

        User user1 = userRepo.findByPhoneNumber(phone1)
                .orElseThrow(() -> new RuntimeException("User not found: " + phone1));

        User user2 = userRepo.findByPhoneNumber(phone2)
                .orElseThrow(() -> new RuntimeException("User not found: " + phone2));

        // Check existing room
        List<ChatRoom> rooms = chatRoomRepo.findRoomsByTwoParticipants(phone1, phone2);

        for (ChatRoom room : rooms) {
            if (room.getUsers().contains(user1) && room.getUsers().contains(user2)) {
                return room; // Existing room
            }
        }

        // Create new room
        ChatRoom newRoom = new ChatRoom();
        newRoom.setName(user1.getDisplayName() + " & " + user2.getDisplayName());

        Set<User> members = new HashSet<>();
        members.add(user1);
        members.add(user2);

        newRoom.setUsers(members);

        return chatRoomRepo.save(newRoom);
    }
}
