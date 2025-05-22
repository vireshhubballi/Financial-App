package com.financialadvisor.controller;


import com.financialadvisor.model.UserSettings;
import com.financialadvisor.service.UserSettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
public class UserSettingsController {
    @Autowired
    private UserSettingsService userSettingsService;

    // Get user settings
    @GetMapping("/{userId}")
    public UserSettings getSettings(@PathVariable Long userId) {
        return userSettingsService.getUserSettings(userId);
    }

    // Update user settings
    @PutMapping("/{userId}")
    public UserSettings updateSettings(@PathVariable Long userId, @RequestBody UserSettings updatedSettings) {
        return userSettingsService.updateUserSettings(userId, updatedSettings);
    }

    // Delete user account
    @DeleteMapping("/{userId}")
    public boolean deleteAccount(@PathVariable Long userId) {
        return userSettingsService.deleteAccount(userId);
    }
}
