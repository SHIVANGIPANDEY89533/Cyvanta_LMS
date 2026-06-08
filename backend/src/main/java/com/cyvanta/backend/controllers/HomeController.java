package com.cyvanta.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Cyvanta LMS Backend is running successfully! Please use the frontend URL to access the website.";
    }
}
