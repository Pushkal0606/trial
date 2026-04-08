package com.example.eduerp.controller;

import com.example.eduerp.entity.User;
import com.example.eduerp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        user.setStatus("ACTIVE");
        return userRepository.save(user);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        return userRepository.findById(id).map(existing -> {
            user.setId(id);
            if (user.getPassword() == null) user.setPassword(existing.getPassword());
            return ResponseEntity.ok(userRepository.save(user));
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/students")
    public List<User> getStudents() {
        return userRepository.findAll().stream()
                .filter(u -> "STUDENT".equalsIgnoreCase(u.getRole()))
                .collect(Collectors.toList());
    }
    
    @GetMapping("/students/{id}")
    public ResponseEntity<User> getStudent(@PathVariable Long id) {
        return userRepository.findById(id)
                .filter(u -> "STUDENT".equalsIgnoreCase(u.getRole()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/teachers")
    public List<User> getTeachers() {
        return userRepository.findAll().stream()
                .filter(u -> "TEACHER".equalsIgnoreCase(u.getRole()))
                .collect(Collectors.toList());
    }
    
    @GetMapping("/teachers/{id}")
    public ResponseEntity<User> getTeacher(@PathVariable Long id) {
        return userRepository.findById(id)
                .filter(u -> "TEACHER".equalsIgnoreCase(u.getRole()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
