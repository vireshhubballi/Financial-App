package com.financialadvisor.controller;

import com.financialadvisor.model.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/profile")
    public User getUserProfile() {
        // 🔹 Dummy profile response (replace with DB query)
        return new User();
    }

    @PutMapping("/profile")
    public User updateUserProfile(@RequestBody User updatedUser) {
        // 🔹 Dummy update logic (replace with DB update)
        return updatedUser;
    }
}
