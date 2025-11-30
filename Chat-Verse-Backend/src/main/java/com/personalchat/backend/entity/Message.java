package com.personalchat.backend.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "messages")
public class Message {

    @Id
    private String id;

    private String content;

    private LocalDateTime timestamp;

    private Long senderPhoneNumber;

    private Long chatRoomId;

    // Optional property for file URL
    private String fileUrl;

    // Message status: SENT, DELIVERED, READ
    private String status = "SENT";

    // Getters and setters
    public String getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public Long getSenderPhoneNumber() {
        return senderPhoneNumber;
    }

    public Long getChatRoomId() {
        return chatRoomId;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public void setSenderPhoneNumber(Long senderPhoneNumber) {
        this.senderPhoneNumber = senderPhoneNumber;
    }

    public void setChatRoomId(Long chatRoomId) {
        this.chatRoomId = chatRoomId;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
