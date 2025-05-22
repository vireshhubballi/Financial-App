package com.financialadvisor.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import com.financialadvisor.model.DashboardData;
import com.financialadvisor.service.FinancialService;


@RestController
@RequestMapping("/api/financial")
public class FinancialController {
    private final FinancialService financialService;
    public FinancialController(FinancialService financialService) {
        this.financialService = financialService;
    }

    @GetMapping("/overview")
    public DashboardData getDashboardData() {
        return financialService.getDashboardData();
    }
}

