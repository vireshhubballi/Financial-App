package com.financialadvisor.service;

// InvestmentService.java


import com.financialadvisor.model.Investment;
import com.financialadvisor.repository.InvestmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvestmentService {

    @Autowired
    private InvestmentRepository investmentRepository;

    public List<Investment> getAllInvestments() {
        return investmentRepository.findAll();
    }

    public Investment createInvestment(Investment investment) {
        return investmentRepository.save(investment);
    }
}

