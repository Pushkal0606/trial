package com.example.eduerp.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "announcements")
@Data
public class Announcement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String body;
    
    private String postedBy;
    private String role; // TEACHER, ADMIN
    private Long classId; // nullable if for all
    
    private LocalDateTime createdAt = LocalDateTime.now();
}
