package com.cyvanta.backend.service;

import com.cyvanta.backend.dto.CreateCourseRequest;
import com.cyvanta.backend.dto.UpdateCourseRequest;
import com.cyvanta.backend.exceptions.ResourceNotFoundException;
import com.cyvanta.backend.models.Course;
import com.cyvanta.backend.repositories.CourseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public Course createCourse(CreateCourseRequest request) {
        Course course = new Course();
        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setThumbnailUrl(request.getThumbnailUrl());
        course.setYoutubePlaylistUrl(request.getYoutubePlaylistUrl());
        course.setPrice(request.getPrice());
        course.setFreeCourse(request.isFreeCourse());
        course.setPublished(request.isPublished());
        course.setCreatedAt(LocalDateTime.now());
        return courseRepository.save(course);
    }

    public Course updateCourse(String id, UpdateCourseRequest request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));

        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setThumbnailUrl(request.getThumbnailUrl());
        course.setYoutubePlaylistUrl(request.getYoutubePlaylistUrl());
        course.setPrice(request.getPrice());
        course.setPublished(request.isPublished());
        course.setFreeCourse(request.isFreeCourse());

        return courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public List<Course> getPublishedCourses() {
        return courseRepository.findByPublishedTrue();
    }

    public Course getCourseById(String id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
    }

    public void deleteCourse(String id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
        courseRepository.delete(course);
    }
}