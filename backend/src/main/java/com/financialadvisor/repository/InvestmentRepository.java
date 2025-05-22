package com.financialadvisor.repository;

// InvestmentRepository.java


import com.financialadvisor.model.Investment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvestmentRepository extends JpaRepository<Investment, Long> {
}
