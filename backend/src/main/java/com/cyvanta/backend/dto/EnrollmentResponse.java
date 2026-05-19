package com.cyvanta.backend.dto;

import java.time.LocalDateTime;

public class EnrollmentResponse {
    private String id;
    private String studentId;
    private String courseId;
    private boolean active;
    private LocalDateTime enrolledAt;

    public EnrollmentResponse() {
    }

    public EnrollmentResponse(String id, String studentId, String courseId, boolean active, LocalDateTime enrolledAt) {
        this.id = id;
        this.studentId = studentId;
        this.courseId = courseId;
        this.active = active;
        this.enrolledAt = enrolledAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public LocalDateTime getEnrolledAt() {
        return enrolledAt;
    }

    public void setEnrolledAt(LocalDateTime enrolledAt) {
        this.enrolledAt = enrolledAt;
    }
}
