package com.personalchat.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.personalchat.backend.dto.LoginRequest;
import com.personalchat.backend.dto.RegisterRequest;
import com.personalchat.backend.entity.User;
import com.personalchat.backend.repositories.UserRepo;
import com.personalchat.backend.service.UserServiceImpl;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin(origins = "https://chat-verse-frontend-seven.vercel.app", allowCredentials = "true")
@RestController
public class HomeController {

    @Autowired
    private UserRepo userRepo;


    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/home")
    public String home(){
        return "Welcome to Personal Chat!";
    }

    @PostMapping("/saveUser")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest registerRequest
            ) {

        if (userRepo.findByPhoneNumber(registerRequest.getPhoneNumber()).isPresent()) {
            return ResponseEntity.badRequest().body("Phone number already registered.");
        }

        User user = new User();
        user.setDisplayName(registerRequest.getDisplayName());
        user.setPhoneNumber(registerRequest.getPhoneNumber());
        user.setPassword(registerRequest.getPassword());

        User newUser = userService.saveUser(user);

        if (newUser == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving user to the database.");
        }
        return ResponseEntity.status(HttpStatus.OK).body("User registered successfully.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest loginRequest,
            HttpServletResponse response
            ) {
        System.out.println("Login attempt for phone number: " + loginRequest.getPhoneNumber());
        System.out.println("Password: " + loginRequest.getPassword());
        try {
            User user = userService.loginUser(loginRequest.getPhoneNumber(), loginRequest.getPassword());
            if (user == null) {
                System.out.println("User not found");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }

            return ResponseEntity.ok(Map.of(
                    "phoneNumber", user.getPhoneNumber(),
                    "displayName", user.getDisplayName(),
                    "role", user.getRole()
            ));
        } catch (BadCredentialsException e) {
//            System.out.println("6");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        request.getSession().invalidate(); // for session-based logout
        return ResponseEntity.ok("Logout successful");
    }

    @GetMapping("/profile/{phoneNumber}")
    public ResponseEntity<?> getProfile(@PathVariable String phoneNumber) {
        User userOptional = userService.getUserByPhoneNumber(phoneNumber);
        if (userOptional == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        return ResponseEntity.ok(Map.of(
                "displayName", userOptional.getDisplayName()
        ));
    }

    @PostMapping("/profile/changePassword")
    public ResponseEntity<?> changePassword(
            @RequestBody LoginRequest loginRequest
            ) {
        String phoneNumber = loginRequest.getPhoneNumber();
        String newPassword = loginRequest.getPassword();
        System.out.println("Change password request for phone number: " + phoneNumber);
        System.out.println("New password: " + newPassword);

        User user = userService.getUserByPhoneNumber(phoneNumber);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(newPassword));
        userService.saveUser(user);

        return ResponseEntity.status(HttpStatus.OK)
                .body("Password changed successfully");
    }
}
