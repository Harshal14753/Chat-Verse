package com.personalchat.backend.repositories;

import com.personalchat.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {

    // Custom query methods can be defined here if needed
    // For example, to find a user by username:
    // Optional<User> findByUsername(String username);
    Optional<User> findByPhoneNumber(Long phoneNumber);

//    User findByPhoneNumber(String phoneNumber);

//    findById
//    Optional<User> findById(Long id);

    // Or to find users by their role:
    // List<User> findByRole(Role role);

//    List<User> findByPhoneNumberStartsWith(Long phoneNumberPrefix);
}
