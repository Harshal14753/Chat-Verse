package com.personalchat.backend.repositories;

import com.personalchat.backend.entity.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepo extends MongoRepository<Message, String> {

    // Custom query methods can be defined here if needed
    // For example, to find messages by sender ID:
    // List<Message> findBySenderId(String senderId);

    // Or to find messages by chat room ID:
     List<Message> findByChatRoomId(Long chatRoomId);

     // Extract messages by senderPhoneNumber and chatRoomId and sort by timestamp ascending
     List<Message> findByChatRoomIdOrderByTimestampAsc(Long chatRoomId);
}
