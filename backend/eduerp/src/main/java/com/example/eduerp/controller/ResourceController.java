package com.example.eduerp.controller;

import com.example.eduerp.entity.Resource;
import com.example.eduerp.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    @Autowired
    private ResourceRepository repository;

    @GetMapping
    public List<Resource> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Resource create(@RequestBody Resource item) {
        return repository.save(item);
    }
    
    @PutMapping("/{id}")
    public Resource update(@PathVariable Long id, @RequestBody Resource item) {
        item.setId(id);
        return repository.save(item);
    }
    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
