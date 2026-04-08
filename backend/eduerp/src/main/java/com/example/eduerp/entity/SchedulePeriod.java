package com.example.eduerp.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalTime;

@Entity
@Table(name = "schedule_periods")
@Data
public class SchedulePeriod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String day; // Mon, Tue, etc.
    private LocalTime startTime;
    private LocalTime endTime;
    
    private String subject;
    private Long teacherId;
    private String room;
    private Long classId;
}
