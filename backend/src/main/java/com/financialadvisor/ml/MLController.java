package com.financialadvisor.ml;


import com.financialadvisor.ml.MLService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ml")
public class MLController {

    @Autowired
    private MLService mlService;

    @PostMapping("/predict")
    public ResponseEntity<String> predict(@RequestBody String inputData) {
        String result = mlService.predict(inputData);
        return ResponseEntity.ok(result);
    }
}
