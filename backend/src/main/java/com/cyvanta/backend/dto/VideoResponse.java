package com.cyvanta.backend.dto;

import java.time.LocalDateTime;

public class VideoResponse {

    private String id;
    private String courseId;
    private String title;
    private String description;
    private String cloudinaryPublicId;
    private String secureUrl;
    private String thumbnailUrl;
    private String youtubeVideoId;
    private boolean freeVideo;
    private boolean published;
    private LocalDateTime createdAt;

    public VideoResponse() {
    }

    public VideoResponse(String id, String courseId, String title, String description, String cloudinaryPublicId, String secureUrl, String thumbnailUrl, String youtubeVideoId, boolean freeVideo, boolean published, LocalDateTime createdAt) {
        this.id = id;
        this.courseId = courseId;
        this.title = title;
        this.description = description;
        this.cloudinaryPublicId = cloudinaryPublicId;
        this.secureUrl = secureUrl;
        this.thumbnailUrl = thumbnailUrl;
        this.youtubeVideoId = youtubeVideoId;
        this.freeVideo = freeVideo;
        this.published = published;
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

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

    public String getYoutubeVideoId() {
        return youtubeVideoId;
    }

    public void setYoutubeVideoId(String youtubeVideoId) {
        this.youtubeVideoId = youtubeVideoId;
    }

    public boolean isFreeVideo() {
        return freeVideo;
    }

    public void setFreeVideo(boolean freeVideo) {
        this.freeVideo = freeVideo;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
