package com.personalchat.backend.dto;

public class MessageRequest {
    private Long senderPhoneNumber;
    private String content;
    private Long chatRoomId;

    public Long getChatRoomId() {
        return chatRoomId;
    }

    public void setChatRoomId(Long chatRoomId) {
        this.chatRoomId = chatRoomId;
    }

    public MessageRequest() {
    }  

    public MessageRequest( Long senderPhoneNumber, String content, Long timestamp) {
        this.senderPhoneNumber = senderPhoneNumber;
        this.content = content;
    }


    public Long getSenderPhoneNumber() {
        return senderPhoneNumber;
    }

    public void setSenderPhoneNumber(Long senderPhoneNumber) {
        this.senderPhoneNumber = senderPhoneNumber;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
