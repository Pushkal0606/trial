package com.example.eduerp.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
