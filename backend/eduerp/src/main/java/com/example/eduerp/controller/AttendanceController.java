package com.example.eduerp.controller;

import com.example.eduerp.entity.Attendance;
import com.example.eduerp.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceRepository repository;

    @GetMapping
    public List<Attendance> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Attendance create(@RequestBody Attendance item) {
        return repository.save(item);
    }
}
