package com.cyvanta.backend.service;

import com.cyvanta.backend.dto.CreateUserRequest;
import com.cyvanta.backend.dto.UpdateUserRequest;
import com.cyvanta.backend.models.Role;
import com.cyvanta.backend.models.User;
import com.cyvanta.backend.repositories.RoleRepository;
import com.cyvanta.backend.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(CreateUserRequest request) {
        if (request.getName() == null || request.getName().isBlank()
                || request.getEmail() == null || request.getEmail().isBlank()
                || request.getPassword() == null || request.getPassword().isBlank()) {
            throw new IllegalArgumentException("Name, email, and password are required");
        }

        if (userRepository.existsByEmail(request.getEmail().trim())) {
            throw new IllegalArgumentException("Email is already registered");
        }

        String roleName = request.getRole() != null ? request.getRole().trim() : "STUDENT";
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new NoSuchElementException("Role not found: " + roleName));

        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(request.getEmail().trim());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }

    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
    }

    public User updateUser(String id, UpdateUserRequest request) {
        User user = getUserById(id);

        if (request.getActive() != null) {
            user.setActive(request.getActive());
        }

        if (request.getRole() != null) {
            Role role = roleRepository.findByName(request.getRole())
                    .orElseThrow(() -> new NoSuchElementException("Role not found"));
            user.setRole(role);
        }

        return userRepository.save(user);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
