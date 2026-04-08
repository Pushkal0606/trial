package com.example.eduerp.controller;

import com.example.eduerp.entity.Submission;
import com.example.eduerp.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    @Autowired
    private SubmissionRepository repository;

    @GetMapping
    public List<Submission> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Submission create(@RequestBody Submission item) {
        if(item.getStatus() == null) item.setStatus("SUBMITTED");
        return repository.save(item);
    }
}
