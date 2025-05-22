package com.financialadvisor.security;


import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
public class GeminiApiUtil {

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";
    private static final String API_KEY = "AIzaSyChrurYUHhDQ1iU90__Jp4tBGRDzsJPzjc"; // replace with your key

    private final WebClient webClient = WebClient.builder().build();

    public String generateContent(String prompt) {
        String requestBody = "{ \"contents\": [{ \"parts\": [{ \"text\": \"" + prompt + "\" }] }] }";

        return webClient.post()
                .uri(GEMINI_API_URL + "?key=" + API_KEY)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .onErrorResume(e -> Mono.just("Error calling Gemini API: " + e.getMessage()))
                .block();
    }
}
