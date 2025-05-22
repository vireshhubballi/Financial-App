package com.financialadvisor.ml;


import com.financialadvisor.security.GeminiApiUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MLService {

    @Autowired
    private GeminiApiUtil geminiApiUtil;

    public String predict(String inputText) {
        String prompt = "Analyze the following financial data and predict useful insights:\n" + inputText;
        return geminiApiUtil.generateContent(prompt);
    }
}
