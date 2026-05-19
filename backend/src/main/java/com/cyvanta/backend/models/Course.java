package com.cyvanta.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "courses")
public class Course {

    @Id
    private String id;

    private String title;
    private String description;
    private String thumbnailUrl;
    private Double price;
    private boolean published;
    private boolean freeCourse;
    private LocalDateTime createdAt;

    public Course() {
        this.createdAt = LocalDateTime.now();
        this.published = false;
        this.freeCourse = false;
    }

    public Course(String title, String description, String thumbnailUrl, Double price, boolean freeCourse) {
        this.title = title;
        this.description = description;
        this.thumbnailUrl = thumbnailUrl;
        this.price = price;
        this.freeCourse = freeCourse;
        this.published = false;
        this.createdAt = LocalDateTime.now();
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

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    public boolean isFreeCourse() {
        return freeCourse;
    }

    public void setFreeCourse(boolean freeCourse) {
        this.freeCourse = freeCourse;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}