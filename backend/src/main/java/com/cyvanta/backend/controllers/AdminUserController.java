package com.cyvanta.backend.controllers;

import com.cyvanta.backend.dto.CreateUserRequest;
import com.cyvanta.backend.dto.UpdateUserRequest;
import com.cyvanta.backend.dto.UserResponse;
import com.cyvanta.backend.models.User;
import com.cyvanta.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin("*")
public class AdminUserController {

    private final UserService userService;

    public AdminUserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users.stream().map(this::toResponse).collect(Collectors.toList()));
    }

    @PostMapping
    public ResponseEntity<UserResponse> createUser(@RequestBody CreateUserRequest request) {
        User created = userService.createUser(request);
        return ResponseEntity.ok(toResponse(created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable String id,
                                                   @RequestBody UpdateUserRequest request) {
        User updated = userService.updateUser(id, request);
        return ResponseEntity.ok(toResponse(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    private UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole() != null ? user.getRole().getName() : null,
                user.isActive(),
                user.getCreatedAt()
        );
    }
}
