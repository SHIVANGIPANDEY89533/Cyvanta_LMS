package com.cyvanta.backend.repositories;

import com.cyvanta.backend.models.LiveSession;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LiveSessionRepository extends MongoRepository<LiveSession, String> {
    List<LiveSession> findByCourseId(String courseId);
}