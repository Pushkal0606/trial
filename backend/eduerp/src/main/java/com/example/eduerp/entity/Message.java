package com.example.eduerp.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@Data
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long threadId;
    private Long senderId;
    
    @Column(columnDefinition = "TEXT")
    private String body;
    
    private LocalDateTime sentAt = LocalDateTime.now();
}
