package com.personalchat.backend.service;

import com.personalchat.backend.entity.ChatRoom;
import com.personalchat.backend.entity.Message;
import com.personalchat.backend.entity.User;

import java.util.List;

public interface ChatRoomService {

    public List<ChatRoom> getAllChatRoomsByUsers(User user);

    public List<Message> getMessagesByChatRoomId(Long chatRoomId);

    public ChatRoom getOrCreatePrivateRoom(Long initiatorPhone, Long otherPhone);
}
