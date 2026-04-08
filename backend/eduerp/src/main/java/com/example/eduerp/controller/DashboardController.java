package com.example.eduerp.controller;

import com.example.eduerp.dto.DashboardStatsDTO;
import com.example.eduerp.entity.Assignment;
import com.example.eduerp.entity.SchedulePeriod;
import com.example.eduerp.entity.User;
import com.example.eduerp.repository.AssignmentRepository;
import com.example.eduerp.repository.SchedulePeriodRepository;
import com.example.eduerp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SchedulePeriodRepository schedulePeriodRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @GetMapping("/student/{userId}")
    public ResponseEntity<DashboardStatsDTO> getStudentDashboard(@PathVariable Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty() || !"STUDENT".equalsIgnoreCase(optionalUser.get().getRole())) {
            return ResponseEntity.badRequest().build();
        }

        User user = optionalUser.get();
        Long classId = user.getClassId();
        
        DashboardStatsDTO stats = new DashboardStatsDTO();

        // 1. Get today's day (e.g. MONDAY)
        String todayDay = LocalDate.now().getDayOfWeek().name().substring(0, 3); // Mon, Tue, etc. matching entity mock data
        // For simplicity, we assume day format is like "Mon"
        String formattedDay = todayDay.substring(0, 1).toUpperCase() + todayDay.substring(1).toLowerCase();

        // 2. Today's Classes
        if (classId != null) {
            List<SchedulePeriod> todayClasses = schedulePeriodRepository.findByClassIdAndDay(classId, formattedDay);
            stats.setTodayClasses(todayClasses.size());

            // 3. Pending assignments
            List<Assignment> assignments = assignmentRepository.findByClassId(classId);
            stats.setPendingAssignments(assignments.size());
        }

        // 4. Attendance Percentage
        stats.setAttendancePercentage(user.getAttendancePercentage() != null ? user.getAttendancePercentage() : 100);

        // 5. GPA
        stats.setGpa(user.getGpa() != null ? user.getGpa() : 4.0);

        return ResponseEntity.ok(stats);
    }
}
