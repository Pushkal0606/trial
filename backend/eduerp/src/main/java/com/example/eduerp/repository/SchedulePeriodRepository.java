package com.example.eduerp.repository;

import com.example.eduerp.entity.SchedulePeriod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SchedulePeriodRepository extends JpaRepository<SchedulePeriod, Long> {
    List<SchedulePeriod> findByClassIdAndDay(Long classId, String day);
}
