package com.cyvanta.backend.repositories;

import com.cyvanta.backend.models.Recording;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RecordingRepository extends MongoRepository<Recording, String> {
    List<Recording> findByCourseId(String courseId);
    List<Recording> findByLiveSessionId(String liveSessionId);
}