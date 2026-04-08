package com.example.eduerp.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "finances")
@Data
public class Finance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private String feeStatus; // PAID, UNPAID, PARTIAL
    private Double amount;
    private LocalDate dueDate;
}
