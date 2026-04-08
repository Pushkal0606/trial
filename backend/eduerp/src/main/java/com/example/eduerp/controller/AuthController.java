package com.example.eduerp.controller;

import com.example.eduerp.dto.AuthResponse;
import com.example.eduerp.dto.LoginRequest;
import com.example.eduerp.dto.SignupRequest;
import com.example.eduerp.entity.User;
import com.example.eduerp.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupRequest request) {
        try {
            User user = authService.registerUser(request);
            return ResponseEntity.ok(new AuthResponse("User registered successfully", user));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new AuthResponse(e.getMessage(), null));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        try {
            User user = authService.authenticateUser(request);
            return ResponseEntity.ok(new AuthResponse("Login successful", user));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new AuthResponse(e.getMessage(), null));
        }
    }
}
