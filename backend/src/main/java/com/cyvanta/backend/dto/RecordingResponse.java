package com.cyvanta.backend.dto;

import com.cyvanta.backend.enums.RecordingStatus;

import java.time.LocalDateTime;

public class RecordingResponse {
    private String id;
    private String courseId;
    private String liveSessionId;
    private String title;
    private String cloudinaryPublicId;
    private String secureUrl;
    private RecordingStatus status;
    private boolean freePreview;
    private LocalDateTime createdAt;

    public RecordingResponse() {
    }

    public RecordingResponse(String id, String courseId, String liveSessionId, String title, String cloudinaryPublicId, String secureUrl, RecordingStatus status, boolean freePreview, LocalDateTime createdAt) {
        this.id = id;
        this.courseId = courseId;
        this.liveSessionId = liveSessionId;
        this.title = title;
        this.cloudinaryPublicId = cloudinaryPublicId;
        this.secureUrl = secureUrl;
        this.status = status;
        this.freePreview = freePreview;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getLiveSessionId() {
        return liveSessionId;
    }

    public void setLiveSessionId(String liveSessionId) {
        this.liveSessionId = liveSessionId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCloudinaryPublicId() {
        return cloudinaryPublicId;
    }

    public void setCloudinaryPublicId(String cloudinaryPublicId) {
        this.cloudinaryPublicId = cloudinaryPublicId;
    }

    public String getSecureUrl() {
        return secureUrl;
    }

    public void setSecureUrl(String secureUrl) {
        this.secureUrl = secureUrl;
    }

    public RecordingStatus getStatus() {
        return status;
    }

    public void setStatus(RecordingStatus status) {
        this.status = status;
    }

    public boolean isFreePreview() {
        return freePreview;
    }

    public void setFreePreview(boolean freePreview) {
        this.freePreview = freePreview;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
