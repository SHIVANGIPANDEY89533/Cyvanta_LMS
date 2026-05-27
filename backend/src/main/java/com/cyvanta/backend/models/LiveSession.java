package com.cyvanta.backend.models;

import com.cyvanta.backend.enums.LiveSessionStatus;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "live_sessions")
public class LiveSession {

    @Id
    private String id;

    private String courseId;
    private String title;
    private String description;
    private String youtubeUrl;
    private String thumbnailUrl;
    private LocalDateTime scheduledAt;
    private LiveSessionStatus status;
    private boolean recordingAvailable;
    private LocalDateTime createdAt;

    public LiveSession() {
        this.status = LiveSessionStatus.SCHEDULED;
        this.recordingAvailable = false;
        this.createdAt = LocalDateTime.now();
    }

    public LiveSession(String courseId, String title, String description, String youtubeUrl, LocalDateTime scheduledAt) {
        this.courseId = courseId;
        this.title = title;
        this.description = description;
        this.youtubeUrl = youtubeUrl;
        this.thumbnailUrl = null;
        this.scheduledAt = scheduledAt;
        this.status = LiveSessionStatus.SCHEDULED;
        this.recordingAvailable = false;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }

    public String getCourseId() {
        return courseId;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getYoutubeUrl() {
        return youtubeUrl;
    }

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public LocalDateTime getScheduledAt() {
        return scheduledAt;
    }

    public LiveSessionStatus getStatus() {
        return status;
    }

    public boolean isRecordingAvailable() {
        return recordingAvailable;
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

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setYoutubeUrl(String youtubeUrl) {
        this.youtubeUrl = youtubeUrl;
    }

    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

    public void setScheduledAt(LocalDateTime scheduledAt) {
        this.scheduledAt = scheduledAt;
    }

    public void setStatus(LiveSessionStatus status) {
        this.status = status;
    }

    public void setRecordingAvailable(boolean recordingAvailable) {
        this.recordingAvailable = recordingAvailable;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}