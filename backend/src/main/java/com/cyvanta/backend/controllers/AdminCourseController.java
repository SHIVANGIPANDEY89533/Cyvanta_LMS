package com.cyvanta.backend.controllers;

import com.cyvanta.backend.dto.CourseResponse;
import com.cyvanta.backend.dto.CreateCourseRequest;
import com.cyvanta.backend.dto.UpdateCourseRequest;
import com.cyvanta.backend.models.Course;
import com.cyvanta.backend.service.CloudinaryService;
import com.cyvanta.backend.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/courses")
@CrossOrigin("*")
public class AdminCourseController {

    private final CourseService courseService;
    private final CloudinaryService cloudinaryService;

    public AdminCourseController(CourseService courseService, CloudinaryService cloudinaryService) {
        this.courseService = courseService;
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping
    public ResponseEntity<CourseResponse> createCourse(@RequestBody CreateCourseRequest request) {
        Course course = courseService.createCourse(request);
        return ResponseEntity.ok(toResponse(course));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseResponse> updateCourse(@PathVariable String id,
                                                       @RequestBody UpdateCourseRequest request) {
        Course course = courseService.updateCourse(id, request);
        return ResponseEntity.ok(toResponse(course));
    }

    @GetMapping
    public ResponseEntity<List<CourseResponse>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses.stream().map(this::toResponse).collect(Collectors.toList()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable String id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/thumbnail")
    public ResponseEntity<Map<String, String>> uploadThumbnail(@RequestPart("file") MultipartFile file) {
        try {
            Map<String, Object> uploadResult = cloudinaryService.uploadImage(file);
            String secureUrl = (String) uploadResult.get("secure_url");
            return ResponseEntity.ok(Map.of("thumbnailUrl", secureUrl));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseResponse> getCourseById(@PathVariable String id) {
        return ResponseEntity.ok(toResponse(courseService.getCourseById(id)));
    }

    private CourseResponse toResponse(Course course) {
        return new CourseResponse(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                course.getThumbnailUrl(),
                course.getPrice(),
                course.isPublished(),
                course.isFreeCourse(),
                course.getCreatedAt()
        );
    }
}