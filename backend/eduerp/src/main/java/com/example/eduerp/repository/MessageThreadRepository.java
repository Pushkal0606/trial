package com.example.eduerp.repository;

import com.example.eduerp.entity.MessageThread;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageThreadRepository extends JpaRepository<MessageThread, Long> {
    List<MessageThread> findByParticipantIdsContaining(Long participantId);
}
