package com.cyvanta.backend.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "courses")
public class Course {
    @Id
    private String id;
    private String title;
    private String description;
    private String thumbnailUrl;
    private String youtubePlaylistUrl;
    private Double price;
    private boolean freeCourse;
    private boolean published;
    private LocalDateTime createdAt;
}