package com.cyvanta.backend.controllers;

import com.cyvanta.backend.dto.ProfileResponse;
import com.cyvanta.backend.dto.ProfileUpdateRequest;
import com.cyvanta.backend.models.User;
import com.cyvanta.backend.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student/profile")
@CrossOrigin("*")
public class StudentProfileController {

    private final UserRepository userRepository;

    public StudentProfileController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<ProfileResponse> getProfile(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("Authenticated user not found."));

        ProfileResponse response = new ProfileResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole() != null ? user.getRole().getName() : null,
                user.isActive(),
                user.getCreatedAt(),
                user.getBio()
        );

        return ResponseEntity.ok(response);
    }

    @PutMapping
    public ResponseEntity<ProfileResponse> updateProfile(
            Authentication authentication,
            @RequestBody ProfileUpdateRequest request
    ) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("Authenticated user not found."));

        if (request.getName() != null) {
            user.setName(request.getName());
        }

        if (request.getBio() != null) {
            user.setBio(request.getBio());
        }

        User saved = userRepository.save(user);

        ProfileResponse response = new ProfileResponse(
                saved.getId(),
                saved.getName(),
                saved.getEmail(),
                saved.getRole() != null ? saved.getRole().getName() : null,
                saved.isActive(),
                saved.getCreatedAt(),
                saved.getBio()
        );

        return ResponseEntity.ok(response);
    }
}