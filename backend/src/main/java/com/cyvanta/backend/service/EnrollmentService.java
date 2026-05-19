package com.cyvanta.backend.service;

import com.cyvanta.backend.exceptions.BadRequestException;
import com.cyvanta.backend.exceptions.ResourceNotFoundException;
import com.cyvanta.backend.models.Course;
import com.cyvanta.backend.models.Enrollment;
import com.cyvanta.backend.models.User;
import com.cyvanta.backend.repositories.CourseRepository;
import com.cyvanta.backend.repositories.EnrollmentRepository;
import com.cyvanta.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository,
                             UserRepository userRepository,
                             CourseRepository courseRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }

    public Enrollment enroll(String email, String courseId) {
        User student = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with email: " + email));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        if (enrollmentRepository.existsByStudentIdAndCourseId(student.getId(), course.getId())) {
            throw new BadRequestException("Student is already enrolled in this course.");
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setStudentId(student.getId());
        enrollment.setCourseId(course.getId());
        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getEnrollments(String email) {
        User student = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with email: " + email));
        return enrollmentRepository.findByStudentId(student.getId());
    }
}
