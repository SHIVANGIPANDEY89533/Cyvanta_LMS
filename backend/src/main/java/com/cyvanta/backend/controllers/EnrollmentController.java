package com.cyvanta.backend.controllers;

import com.cyvanta.backend.dto.EnrollmentResponse;
import com.cyvanta.backend.models.Enrollment;
import com.cyvanta.backend.service.EnrollmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/student/enrollments")
@CrossOrigin("*")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping
    public ResponseEntity<EnrollmentResponse> enrollInCourse(Authentication authentication,
                                                             @RequestParam("courseId") String courseId) {
        Enrollment enrollment = enrollmentService.enroll(authentication.getName(), courseId);
        return ResponseEntity.ok(toResponse(enrollment));
    }

    @GetMapping
    public ResponseEntity<List<EnrollmentResponse>> getEnrollments(Authentication authentication) {
        List<Enrollment> enrollments = enrollmentService.getEnrollments(authentication.getName());
        return ResponseEntity.ok(enrollments.stream().map(this::toResponse).collect(Collectors.toList()));
    }

    private EnrollmentResponse toResponse(Enrollment enrollment) {
        return new EnrollmentResponse(
                enrollment.getId(),
                enrollment.getStudentId(),
                enrollment.getCourseId(),
                enrollment.isActive(),
                enrollment.getEnrolledAt()
        );
    }
}
