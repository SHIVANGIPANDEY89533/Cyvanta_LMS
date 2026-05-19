package com.cyvanta.backend.models;

import com.cyvanta.backend.enums.RecordingStatus;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "recordings")
public class Recording {

    @Id
    private String id;

    private String courseId;
    private String liveSessionId;
    private String title;
    private String cloudinaryPublicId;
    private String secureUrl;
    private RecordingStatus status;
    private boolean freePreview;
    private LocalDateTime createdAt;

    public Recording() {
        this.status = RecordingStatus.NOT_READY;
        this.freePreview = false;
        this.createdAt = LocalDateTime.now();
    }

    public Recording(String courseId, String liveSessionId, String title, String cloudinaryPublicId, String secureUrl) {
        this.courseId = courseId;
        this.liveSessionId = liveSessionId;
        this.title = title;
        this.cloudinaryPublicId = cloudinaryPublicId;
        this.secureUrl = secureUrl;
        this.status = RecordingStatus.READY;
        this.freePreview = false;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }

    public String getCourseId() {
        return courseId;
    }

    public String getLiveSessionId() {
        return liveSessionId;
    }

    public String getTitle() {
        return title;
    }

    public String getCloudinaryPublicId() {
        return cloudinaryPublicId;
    }

    public String getSecureUrl() {
        return secureUrl;
    }

    public RecordingStatus getStatus() {
        return status;
    }

    public boolean isFreePreview() {
        return freePreview;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public void setLiveSessionId(String liveSessionId) {
        this.liveSessionId = liveSessionId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCloudinaryPublicId(String cloudinaryPublicId) {
        this.cloudinaryPublicId = cloudinaryPublicId;
    }

    public void setSecureUrl(String secureUrl) {
        this.secureUrl = secureUrl;
    }

    public void setStatus(RecordingStatus status) {
        this.status = status;
    }

    public void setFreePreview(boolean freePreview) {
        this.freePreview = freePreview;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}