package com.financialadvisor.service;

import com.financialadvisor.model.Goal;
import com.financialadvisor.repository.GoalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GoalService {

    @Autowired
    private GoalRepository goalRepository;

    public List<Goal> getAllGoals() {
        return goalRepository.findAll();
    }

    public Optional<Goal> getGoalById(Long id) {
        return goalRepository.findById(id);
    }

    public Goal createGoal(Goal goal) {
        return goalRepository.save(goal);
    }

    public Goal updateGoal(Long id, Goal updatedGoal) {
        return goalRepository.findById(id).map(goal -> {
            goal.setName(updatedGoal.getName());
            goal.setDescription(updatedGoal.getDescription());
            goal.setTargetAmount(updatedGoal.getTargetAmount());
            goal.setCurrentAmount(updatedGoal.getCurrentAmount());
            goal.setCategory(updatedGoal.getCategory());
            goal.setPriority(updatedGoal.getPriority());
            goal.setReminder(updatedGoal.getReminder());
            return goalRepository.save(goal);
        }).orElseThrow(() -> new RuntimeException("Goal not found"));
    }

    public void deleteGoal(Long id) {
        goalRepository.deleteById(id);
    }
}