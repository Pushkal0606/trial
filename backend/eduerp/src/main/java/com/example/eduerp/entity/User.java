package com.example.eduerp.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    private String role; // STUDENT, TEACHER, ADMIN, ADMINISTRATOR
    
    private String avatar; // Initials, etc.
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    // --- Student specifics ---
    private String enrollmentId;
    private Long classId;
    private String department;
    private Integer attendancePercentage;
    private Double gpa;
    
    // --- Teacher specifics ---
    private String employeeId;
    
    @ElementCollection
    private List<String> subjects;
    
    @ElementCollection
    private List<Long> classes;
    
    private String status; // ACTIVE, INACTIVE
}
