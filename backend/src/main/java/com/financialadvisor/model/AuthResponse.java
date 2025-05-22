package com.financialadvisor.model;

public class AuthResponse {
    private String token;
    private User user;
    private String email;
    
    // Default constructor
    public AuthResponse() {}
    
    // Constructor with parameters
    public AuthResponse(String token,String email, User user) {
        this.token = token;
        this.email = email;
        this.user = user;
    }
    
    // Getters and setters
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
}