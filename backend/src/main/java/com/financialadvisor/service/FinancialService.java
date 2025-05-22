package com.financialadvisor.service;

import com.financialadvisor.model.DashboardData;
import org.springframework.stereotype.Service;

@Service
public class FinancialService {

    public DashboardData getDashboardData() {
        // Example: Hardcoded data (Replace with DB calls later)
        return new DashboardData(
            25000.00,  // Balance
            5000.00,   // Income
            2000.00,   // Expenses
            3000.00,   // Savings
            12000.00,  // Investment Value
            7.5        // Growth Rate
        );
    }
}
