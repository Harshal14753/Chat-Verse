package com.personalchat.backend.service;


import com.personalchat.backend.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    public User saveUser(User user);

    public User loginUser(String phoneNumber, String password);

    public User getUserByPhoneNumber(String phoneNumber);

    public Optional<User> getUserById(Long id);

    public User searchByPhoneNumber(Long phoneNumber);
}
