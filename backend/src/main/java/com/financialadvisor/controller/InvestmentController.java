package com.financialadvisor.controller;
// InvestmentController.java


import com.financialadvisor.model.Investment;
import com.financialadvisor.service.InvestmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/investments")
@CrossOrigin(origins = "http://localhost:5173")
public class InvestmentController {

    @Autowired
    private InvestmentService investmentService;

    @GetMapping
    public List<Investment> getAllInvestments() {
        return investmentService.getAllInvestments();
    }

    @PostMapping
    public Investment createInvestment(@RequestBody Investment investment) {
        return investmentService.createInvestment(investment);
    }
}
