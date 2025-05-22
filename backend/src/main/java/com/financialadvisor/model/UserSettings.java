package com.financialadvisor.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UserSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String email;
    private String theme;
    private String language;
    private String currency;
    private String region;
    private Boolean reminders;
    private Boolean aiTips;
    private Boolean twoFA;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTheme() { return theme; }
    public void setTheme(String theme) { this.theme = theme; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }

    public Boolean getReminders() { return reminders; }
    public void setReminders(Boolean reminders) { this.reminders = reminders; }

    public Boolean getAiTips() { return aiTips; }
    public void setAiTips(Boolean aiTips) { this.aiTips = aiTips; }

    public Boolean getTwoFA() { return twoFA; }
    public void setTwoFA(Boolean twoFA) { this.twoFA = twoFA; }
}
