package com.financialadvisor.demo.services;

import com.financialadvisor.demo.model.User;
import com.financialadvisor.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    

    public String register(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return "Username already exists!";
        }

        // Encode password before saving
      
        userRepository.save(user);
        return "User registered successfully!";
    }

    public String login(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

           
        }
        return "Invalid username or password!";
    }
}
