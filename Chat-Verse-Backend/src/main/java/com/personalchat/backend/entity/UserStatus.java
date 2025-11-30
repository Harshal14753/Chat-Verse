package com.personalchat.backend.entity;

public enum UserStatus {
    ONLINE,
    OFFLINE;

    public String getStatus() {
        return this.name().toLowerCase();
    }
}

