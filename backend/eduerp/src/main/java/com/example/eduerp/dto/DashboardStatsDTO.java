package com.example.eduerp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDTO {
    private int todayClasses;
    private int pendingAssignments;
    private int attendancePercentage;
    private double gpa;
}
