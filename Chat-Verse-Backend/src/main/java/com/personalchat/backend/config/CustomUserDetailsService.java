package com.personalchat.backend.config;

import com.personalchat.backend.entity.User;
import com.personalchat.backend.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

@Configuration
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Loading user by phone number imp : " + username);
        // Convert username (String) to Long before passing to findByPhoneNumber
        Long phoneNumber;
        try {
            phoneNumber = Long.parseLong(username);
        } catch (NumberFormatException e) {
            throw new UsernameNotFoundException("Invalid phone number format: " + username);
        }
        User user = userRepo.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with phone number: " + username));
        System.out.println("User found: " + user.getPhoneNumber());
        return new CustomUserDetails(user);
    }
}
