package com.example.eduerp.controller;

import com.example.eduerp.entity.Announcement;
import com.example.eduerp.repository.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {

    @Autowired
    private AnnouncementRepository repository;

    @GetMapping
    public List<Announcement> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Announcement create(@RequestBody Announcement item) {
        return repository.save(item);
    }
    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
