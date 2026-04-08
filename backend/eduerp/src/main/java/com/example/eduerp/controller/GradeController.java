package com.example.eduerp.controller;

import com.example.eduerp.entity.Grade;
import com.example.eduerp.repository.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grades")
public class GradeController {

    @Autowired
    private GradeRepository repository;

    @GetMapping
    public List<Grade> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Grade create(@RequestBody Grade item) {
        return repository.save(item);
    }
}
