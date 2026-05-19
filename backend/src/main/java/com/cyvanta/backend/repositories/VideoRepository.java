package com.cyvanta.backend.repositories;

import com.cyvanta.backend.models.Video;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface VideoRepository extends MongoRepository<Video, String> {
    List<Video> findByCourseId(String courseId);
}