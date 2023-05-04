package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Messages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessagesRepository extends JpaRepository<Messages, Integer> {
    public Messages findByMessageId(int messageId);
}
