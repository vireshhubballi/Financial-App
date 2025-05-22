package com.financialadvisor.service;

import com.financialadvisor.model.User;
import com.financialadvisor.model.AuthResponse;
import com.financialadvisor.repository.UserRepository;
import com.financialadvisor.security.JwtUtil;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    
    public AuthService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }
    
    public AuthResponse register(User user) {
        // Save user (TODO: Hash password before saving)
        User savedUser = userRepository.save(user);
        String token = jwtUtil.generateToken(user.getEmail());
        
        // Don't return password in response
        savedUser.setPassword(null);
        
        return new AuthResponse(token, user.getEmail(),savedUser);
    }
    
    public AuthResponse authenticate(User user) {
        Optional<User> foundUser = userRepository.findByEmail(user.getEmail());
        
        if (foundUser.isPresent() && foundUser.get().getPassword().equals(user.getPassword())) {
            String token = jwtUtil.generateToken(user.getEmail());
            
            // Don't return password in response
            User userToReturn = foundUser.get();
            userToReturn.setPassword(null);
            
            return new AuthResponse(token,user.getEmail(), userToReturn);
        }
        
        throw new RuntimeException("Invalid credentials");
    }
}