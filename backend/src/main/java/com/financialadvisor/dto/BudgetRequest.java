package com.financialadvisor.dto;

public class BudgetRequest {
    private Long id;
    private String category;
    private double amount;
    private String description;
    private String month;
    private String priority;

    public BudgetRequest() {}

    public BudgetRequest(Long id, String category, double amount, String description, String month, String priority) {
        this.id = id;
        this.category = category;
        this.amount = amount;
        this.description = description;
        this.month = month;
        this.priority = priority;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getMonth() { return month; }
    public void setMonth(String month) { this.month = month; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
}
