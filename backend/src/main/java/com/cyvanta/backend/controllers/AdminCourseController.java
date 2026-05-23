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

import java.io.IOException;
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
        return ResponseEntity.ok(toResponse(courseService.createCourse(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseResponse> updateCourse(@PathVariable String id, @RequestBody UpdateCourseRequest request) {
        return ResponseEntity.ok(toResponse(courseService.updateCourse(id, request)));
    }

    @GetMapping
    public ResponseEntity<List<CourseResponse>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses().stream().map(this::toResponse).collect(Collectors.toList()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable String id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/thumbnail")
    public ResponseEntity<Map<String, String>> uploadThumbnail(@RequestPart("file") MultipartFile file) throws IOException {
        Map<String, Object> uploadResult = cloudinaryService.uploadImage(file);
        return ResponseEntity.ok(Map.of("thumbnailUrl", (String) uploadResult.get("secure_url")));
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