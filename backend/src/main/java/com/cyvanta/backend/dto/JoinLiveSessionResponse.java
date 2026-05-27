package com.cyvanta.backend.dto;

import com.cyvanta.backend.enums.LiveSessionStatus;

import java.time.LocalDateTime;

public class JoinLiveSessionResponse {

    private String id;
    private String title;
    private String description;
    private String youtubeUrl;
    private String thumbnailUrl;
    private LocalDateTime scheduledAt;
    private LiveSessionStatus status;
    private boolean recordingAvailable;

    public JoinLiveSessionResponse() {
    }

    public JoinLiveSessionResponse(String id, String title, String description, String youtubeUrl, String thumbnailUrl, LocalDateTime scheduledAt, LiveSessionStatus status, boolean recordingAvailable) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.youtubeUrl = youtubeUrl;
        this.thumbnailUrl = thumbnailUrl;
        this.scheduledAt = scheduledAt;
        this.status = status;
        this.recordingAvailable = recordingAvailable;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getYoutubeUrl() {
        return youtubeUrl;
    }

    public void setYoutubeUrl(String youtubeUrl) {
        this.youtubeUrl = youtubeUrl;
    }

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

    public LocalDateTime getScheduledAt() {
        return scheduledAt;
    }

    public void setScheduledAt(LocalDateTime scheduledAt) {
        this.scheduledAt = scheduledAt;
    }

    public LiveSessionStatus getStatus() {
        return status;
    }

    public void setStatus(LiveSessionStatus status) {
        this.status = status;
    }

    public boolean isRecordingAvailable() {
        return recordingAvailable;
    }

    public void setRecordingAvailable(boolean recordingAvailable) {
        this.recordingAvailable = recordingAvailable;
    }
}
