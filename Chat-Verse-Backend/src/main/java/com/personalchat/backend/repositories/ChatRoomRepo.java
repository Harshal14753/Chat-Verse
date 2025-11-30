package com.personalchat.backend.repositories;

import com.personalchat.backend.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepo extends JpaRepository<ChatRoom, Long> {

    // Custom query methods can be defined here if needed
    // For example, to find a chat room by its name:
    // Optional<ChatRoom> findByName(String name);

    // To find all chat rooms that a user is part of by their phone number
    List<ChatRoom> findByUsers_PhoneNumber(Long phoneNumber);

    Optional<ChatRoom> findById(Long id);

    // Find chatrooms that contain both users (by phone numbers) and exactly 2 participants ->
    // this JPQL uses member of and size check to avoid duplicate 1:1 rooms
    @Query("""
        SELECT cr FROM ChatRoom cr
        JOIN cr.users u1
        JOIN cr.users u2
        WHERE u1.phoneNumber = :phoneA AND u2.phoneNumber = :phoneB
    """)
    List<ChatRoom> findRoomsByTwoParticipants(
            @Param("phoneA") Long phoneA,
            @Param("phoneB") Long phoneB
    );
}
