package com.cyvanta.backend.controllers;

import com.cyvanta.backend.dto.ProfileResponse;
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
                user.getRole(),
                user.isActive(),
                user.getCreatedAt()
        );

        return ResponseEntity.ok(response);
    }
}
