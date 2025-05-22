package com.financialadvisor.model;

import jakarta.persistence.*;

@Entity
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private Double targetAmount;
    private Double currentAmount;
    private String category;
    private String priority;
    private String reminder;

    // ✅ Constructors
    public Goal() {}

    public Goal(String name, String description, Double targetAmount, Double currentAmount,
                String category, String priority, String reminder) {
        this.name = name;
        this.description = description;
        this.targetAmount = targetAmount;
        this.currentAmount = currentAmount;
        this.category = category;
        this.priority = priority;
        this.reminder = reminder;
    }

    // ✅ Getters & Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public Double getTargetAmount() { return targetAmount; }

    public void setTargetAmount(Double targetAmount) { this.targetAmount = targetAmount; }

    public Double getCurrentAmount() { return currentAmount; }

    public void setCurrentAmount(Double currentAmount) { this.currentAmount = currentAmount; }

    public String getCategory() { return category; }

    public void setCategory(String category) { this.category = category; }

    public String getPriority() { return priority; }

    public void setPriority(String priority) { this.priority = priority; }

    public String getReminder() { return reminder; }

    public void setReminder(String reminder) { this.reminder = reminder; }
}
