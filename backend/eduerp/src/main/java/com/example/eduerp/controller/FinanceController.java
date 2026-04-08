package com.example.eduerp.controller;

import com.example.eduerp.entity.Finance;
import com.example.eduerp.repository.FinanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/finance")
public class FinanceController {

    @Autowired
    private FinanceRepository repository;

    @GetMapping
    public List<Finance> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Finance create(@RequestBody Finance item) {
        return repository.save(item);
    }
    
    @PutMapping("/{id}")
    public Finance update(@PathVariable Long id, @RequestBody Finance item) {
        item.setId(id);
        return repository.save(item);
    }
}
