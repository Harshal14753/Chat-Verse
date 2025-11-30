package com.personalchat.backend.dto;

public class CreateRoomRequest {

    private Long participant1PhoneNumber;
    private Long participant2PhoneNumber;

    public CreateRoomRequest() {
    }

    public CreateRoomRequest(Long participant1PhoneNumber, Long participant2PhoneNumber) {
        this.participant1PhoneNumber = participant1PhoneNumber;
        this.participant2PhoneNumber = participant2PhoneNumber;
    }

    public Long getParticipant1PhoneNumber() {
        return participant1PhoneNumber;
    }

    public void setParticipant1PhoneNumber(Long participant1PhoneNumber) {
        this.participant1PhoneNumber = participant1PhoneNumber;
    }

    public Long getParticipant2PhoneNumber() {
        return participant2PhoneNumber;
    }

    public void setParticipant2PhoneNumber(Long participant2PhoneNumber) {
        this.participant2PhoneNumber = participant2PhoneNumber;
    }
}
