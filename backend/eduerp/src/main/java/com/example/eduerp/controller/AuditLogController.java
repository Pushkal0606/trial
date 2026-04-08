package com.example.eduerp.controller;

import com.example.eduerp.entity.AuditLog;
import com.example.eduerp.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit")
public class AuditLogController {

    @Autowired
    private AuditLogRepository repository;

    @GetMapping
    public List<AuditLog> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public AuditLog create(@RequestBody AuditLog item) {
        return repository.save(item);
    }
}
