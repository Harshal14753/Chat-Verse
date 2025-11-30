package com.personalchat.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.personalchat.backend.repositories.UserRepo;

@CrossOrigin(origins = "https://chat-verse-frontend-seven.vercel.app")
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping("/admin")
@RestController
public class AdminController {

    @Autowired
    private UserRepo userRepo;

    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getProfile(@PathVariable Long id) {
        return userRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
