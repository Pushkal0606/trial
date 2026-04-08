package com.example.eduerp.controller;

import com.example.eduerp.entity.MessageThread;
import com.example.eduerp.entity.Message;
import com.example.eduerp.repository.MessageThreadRepository;
import com.example.eduerp.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageThreadRepository threadRepository;
    
    @Autowired
    private MessageRepository messageRepository;

    @GetMapping("/threads/user/{userId}")
    public List<MessageThread> getUserThreads(@PathVariable Long userId) {
        return threadRepository.findByParticipantIdsContaining(userId);
    }

    @PostMapping("/threads")
    public MessageThread createThread(@RequestBody MessageThread thread) {
        return threadRepository.save(thread);
    }
    
    @GetMapping("/threads/{threadId}")
    public List<Message> getMessages(@PathVariable Long threadId) {
        return messageRepository.findByThreadId(threadId);
    }

    @PostMapping("/threads/{threadId}")
    public Message sendMessage(@PathVariable Long threadId, @RequestBody Message message) {
        message.setThreadId(threadId);
        return messageRepository.save(message);
    }
}
