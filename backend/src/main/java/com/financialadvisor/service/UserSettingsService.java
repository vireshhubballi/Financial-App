package com.financialadvisor.service;

import com.financialadvisor.model.UserSettings;
import com.financialadvisor.repository.UserSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserSettingsService {
    @Autowired
    private UserSettingsRepository userSettingsRepository;

    public UserSettings getUserSettings(Long userId) {
        return userSettingsRepository.findByUserId(userId);
    }

    public UserSettings updateUserSettings(Long userId, UserSettings updatedSettings) {
        UserSettings userSettings = userSettingsRepository.findByUserId(userId);
        if (userSettings != null) {
            userSettings.setEmail(updatedSettings.getEmail());
            userSettings.setTheme(updatedSettings.getTheme());
            userSettings.setLanguage(updatedSettings.getLanguage());
            userSettings.setCurrency(updatedSettings.getCurrency());
            userSettings.setRegion(updatedSettings.getRegion());
            userSettings.setReminders(updatedSettings.getReminders());
            userSettings.setAiTips(updatedSettings.getAiTips());
            userSettings.setTwoFA(updatedSettings.getTwoFA());
            return userSettingsRepository.save(userSettings);
        }
        return null;
    }

    public boolean deleteAccount(Long userId) {
        UserSettings userSettings = userSettingsRepository.findByUserId(userId);
        if (userSettings != null) {
            userSettingsRepository.delete(userSettings);
            return true;
        }
        return false;
    }
}
