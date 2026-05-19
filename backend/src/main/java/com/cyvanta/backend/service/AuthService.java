package com.cyvanta.backend.service;

import com.cyvanta.backend.dto.AuthResponse;
import com.cyvanta.backend.dto.LoginRequest;
import com.cyvanta.backend.models.User;
import com.cyvanta.backend.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthService(AuthenticationManager authenticationManager,
                       UserRepository userRepository,
                       JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String role = user.getRole() != null ? user.getRole().getName() : null;

        if (role == null) {
            throw new RuntimeException("User role not found");
        }

        String token = jwtService.generateToken(user.getEmail(), role);

        return new AuthResponse(token, user.getEmail(), role);
    }
}