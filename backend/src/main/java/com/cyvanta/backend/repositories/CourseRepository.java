package com.cyvanta.backend.repositories;

import com.cyvanta.backend.models.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CourseRepository extends MongoRepository<Course, String> {
    List<Course> findByPublishedTrue();
}