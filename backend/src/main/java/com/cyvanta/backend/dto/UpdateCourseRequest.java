package com.cyvanta.backend.dto;

public class UpdateCourseRequest {
    private String title;
    private String description;
    private String thumbnailUrl;
    private Double price;
    private boolean freeCourse;
    private boolean published;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public boolean isFreeCourse() { return freeCourse; }
    public void setFreeCourse(boolean freeCourse) { this.freeCourse = freeCourse; }
    public boolean isPublished() { return published; }
    public void setPublished(boolean published) { this.published = published; }
}