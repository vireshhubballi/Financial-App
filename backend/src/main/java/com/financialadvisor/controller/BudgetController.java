package com.financialadvisor.controller;

import com.financialadvisor.dto.BudgetRequest;
import com.financialadvisor.service.BudgetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;
@RestController
@RequestMapping("/api/budget")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @GetMapping
    public ResponseEntity<List<BudgetRequest>> getAllBudgets(Authentication authentication) {
        String username = authentication.getName();
        List<BudgetRequest> budgets = budgetService.getBudgetsByUsername(username);
        return ResponseEntity.ok(budgets);
    }

    @PostMapping
    public ResponseEntity<BudgetRequest> addBudget(@RequestBody BudgetRequest budgetRequest, Authentication authentication) {
        String username = authentication.getName();
        BudgetRequest savedBudget = budgetService.saveBudget(budgetRequest, username);
        return ResponseEntity.ok(savedBudget);
    }
}
