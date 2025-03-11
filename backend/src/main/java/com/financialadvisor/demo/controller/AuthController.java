package com.financialadvisor.demo.controller;

import com.financialadvisor.demo.model.User;
import com.financialadvisor.demo.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend requests
public class AuthController {
    
    @Autowired
    private AuthService authService;

    @GetMapping("/")
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("Welcome to the Financial Advisor API!");
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        return ResponseEntity.ok(authService.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        return ResponseEntity.ok(authService.login(user.getUsername(), user.getPassword()));
    }

    @GetMapping("/error")
    public ResponseEntity<String> handleError() {
        return ResponseEntity.status(404).body("Custom Error Page: Resource Not Found");
    }
}
