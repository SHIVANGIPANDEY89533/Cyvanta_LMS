package com.cyvanta.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "videos")
public class Video {

    @Id
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

    public Video() {
        this.freeVideo = false;
        this.published = false;
        this.createdAt = LocalDateTime.now();
    }

    public Video(String courseId, String title, String description, String cloudinaryPublicId, String secureUrl, boolean freeVideo) {
        this.courseId = courseId;
        this.title = title;
        this.description = description;
        this.cloudinaryPublicId = cloudinaryPublicId;
        this.secureUrl = secureUrl;
        this.freeVideo = freeVideo;
        this.published = false;
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

    public String getCloudinaryPublicId() {
        return cloudinaryPublicId;
    }

    public String getSecureUrl() {
        return secureUrl;
    }

    public boolean isFreeVideo() {
        return freeVideo;
    }

    public boolean isPublished() {
        return published;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public String getYoutubeVideoId() {
        return youtubeVideoId;
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

    public void setCloudinaryPublicId(String cloudinaryPublicId) {
        this.cloudinaryPublicId = cloudinaryPublicId;
    }

    public void setSecureUrl(String secureUrl) {
        this.secureUrl = secureUrl;
    }

    public void setFreeVideo(boolean freeVideo) {
        this.freeVideo = freeVideo;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

    public void setYoutubeVideoId(String youtubeVideoId) {
        this.youtubeVideoId = youtubeVideoId;
    }
}