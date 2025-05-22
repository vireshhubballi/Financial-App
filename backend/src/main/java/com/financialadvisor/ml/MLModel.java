package com.financialadvisor.ml;



import org.springframework.stereotype.Component;

@Component
public class MLModel {
    
    public double predictSavings(double currentBalance, double monthlyIncome, double expenses) {
        // Placeholder for ML model logic (Example: Linear Regression)
        return (monthlyIncome - expenses) * 0.8 + currentBalance * 0.05;
    }
}
