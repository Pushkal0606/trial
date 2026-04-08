package com.example.eduerp.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "grades")
@Data
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private String subject;
    private Long assignmentId;
    
    private Double score;
    private Double maxScore;
    private Double finalGrade;
}
