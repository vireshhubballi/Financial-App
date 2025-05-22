package com.financialadvisor.service;

import com.financialadvisor.dto.BudgetRequest;
import com.financialadvisor.model.Budget;
import com.financialadvisor.model.User;
import com.financialadvisor.repository.BudgetRepository;
import com.financialadvisor.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;

    public BudgetService(BudgetRepository budgetRepository, UserRepository userRepository) {
        this.budgetRepository = budgetRepository;
        this.userRepository = userRepository;
    }

    public List<BudgetRequest> getBudgetsByUsername(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return budgetRepository.findByUser(user).stream()
                .map(b -> new BudgetRequest(
                        b.getId(),
                        b.getCategory(),
                        b.getAmount(),
                        b.getDescription(),
                        b.getMonth(),
                        b.getPriority()))
                .collect(Collectors.toList());
    }

    public BudgetRequest saveBudget(BudgetRequest budgetRequest, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Budget budget = new Budget(
                budgetRequest.getCategory(),
                budgetRequest.getAmount(),
                budgetRequest.getDescription(),
                budgetRequest.getMonth(),
                budgetRequest.getPriority(),
                user
        );

        Budget saved = budgetRepository.save(budget);

        return new BudgetRequest(
                saved.getId(),
                saved.getCategory(),
                saved.getAmount(),
                saved.getDescription(),
                saved.getMonth(),
                saved.getPriority()
        );
    }
}
