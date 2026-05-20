package com.cyvanta.backend.config;

import com.cyvanta.backend.models.Role;
import com.cyvanta.backend.models.User;
import com.cyvanta.backend.repositories.RoleRepository;
import com.cyvanta.backend.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Configuration
public class AppConfig {

    @Bean
    CommandLineRunner init(UserRepository userRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder) {
        return args -> {
            Role adminRole = roleRepository.findByName("ADMIN")
                    .orElseGet(() -> roleRepository.save(new Role("ADMIN")));

            if (userRepository.count() == 0) {
                User admin = new User();
                admin.setName("Admin");
                admin.setEmail("admin@cyvanta.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole(adminRole);
                admin.setActive(true);
                admin.setCreatedAt(LocalDateTime.now());

                userRepository.save(admin);
            }
        };
    }
}