package com.financialadvisor.model;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;


@Getter @Setter
@AllArgsConstructor
public class DashboardData {
    private double balance;
    private double income;
    private double expenses;
    private double savings;
    private double investmentValue;
    private double growthRate;
}
