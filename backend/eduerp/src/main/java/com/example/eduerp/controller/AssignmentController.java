package com.example.eduerp.controller;

import com.example.eduerp.entity.Assignment;
import com.example.eduerp.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentRepository repository;

    @GetMapping
    public List<Assignment> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Assignment create(@RequestBody Assignment item) {
        return repository.save(item);
    }
}
