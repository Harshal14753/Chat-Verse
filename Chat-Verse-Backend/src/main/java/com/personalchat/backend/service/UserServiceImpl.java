package com.personalchat.backend.service;

import com.personalchat.backend.entity.User;
import com.personalchat.backend.entity.UserStatus;
import com.personalchat.backend.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    // Assuming you have a UserRepo injected here
     @Autowired
     private UserRepo userRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public User saveUser(User user) {

        user.setRole("ROLE_USER");
        user.setStatus(UserStatus.OFFLINE);
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword())); // Encrypting the password
        return userRepo.save(user); // Placeholder return statement
    }

    @Override
    public User getUserByPhoneNumber(String phoneNumber) {
        // Convert String to Long before querying
        try {
            Long phone = Long.parseLong(phoneNumber);
            return userRepo.findByPhoneNumber(phone).orElse(null);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepo.findById(id);
    }

    @Override
    public User loginUser(String phoneNumber, String password) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        phoneNumber,
                        password
                )
        );
        // Convert phoneNumber String to Long before querying
        try {
            Long phone = Long.parseLong(phoneNumber);
            return userRepo.findByPhoneNumber(phone).orElse(null);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    @Override
    public User searchByPhoneNumber(Long phoneNumber) {

        User user = userRepo.findByPhoneNumber(phoneNumber).orElse(null);
        return user;

    }
}
