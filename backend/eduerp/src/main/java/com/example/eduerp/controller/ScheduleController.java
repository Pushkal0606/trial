package com.example.eduerp.controller;

import com.example.eduerp.entity.SchedulePeriod;
import com.example.eduerp.repository.SchedulePeriodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {

    @Autowired
    private SchedulePeriodRepository repository;

    @GetMapping
    public List<SchedulePeriod> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public SchedulePeriod create(@RequestBody SchedulePeriod item) {
        return repository.save(item);
    }
}
