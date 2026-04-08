package com.example.eduerp.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "submissions")
@Data
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long assignmentId;
    private Long studentId;
    
    private LocalDateTime submittedAt = LocalDateTime.now();
    private String fileUrl;
    
    private Double grade;
    private String feedback;
    
    private String status; // PENDING, SUBMITTED, GRADED
}
