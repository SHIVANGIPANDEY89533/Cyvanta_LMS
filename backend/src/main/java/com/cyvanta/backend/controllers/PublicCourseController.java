package com.cyvanta.backend.controllers;

import com.cyvanta.backend.dto.CourseResponse;
import com.cyvanta.backend.dto.VideoResponse;
import com.cyvanta.backend.models.Course;
import com.cyvanta.backend.models.Video;
import com.cyvanta.backend.service.CourseService;
import com.cyvanta.backend.service.VideoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/public/courses")
@CrossOrigin("*")
public class PublicCourseController {
    private final CourseService courseService;
    private final VideoService videoService;

    public PublicCourseController(CourseService courseService, VideoService videoService) {
        this.courseService = courseService;
        this.videoService = videoService;
    }

    @GetMapping
    public ResponseEntity<List<CourseResponse>> getPublishedCourses() {
        return ResponseEntity.ok(
                courseService.getPublishedCourses()
                        .stream()
                        .map(this::toResponse)
                        .collect(Collectors.toList())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseResponse> getCourseById(@PathVariable String id) {
        return ResponseEntity.ok(toResponse(courseService.getCourseById(id)));
    }

    @GetMapping("/{id}/videos")
    public ResponseEntity<List<VideoResponse>> getCourseVideos(@PathVariable String id) {
        // Find videos for the specific course
        List<Video> videos = videoService.getVideosByCourseId(id);
        return ResponseEntity.ok(
                videos.stream()
                        .map(video -> new VideoResponse(
                                video.getId(),
                                video.getCourseId(),
                                video.getTitle(),
                                video.getDescription(),
                                video.getCloudinaryPublicId(),
                                video.getSecureUrl(),
                                video.getThumbnailUrl(),
                                video.getYoutubeVideoId(),
                                video.isFreeVideo(),
                                video.isPublished(),
                                video.getCreatedAt()
                        ))
                        .collect(Collectors.toList())
        );
    }

    private CourseResponse toResponse(Course course) {
        return new CourseResponse(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                course.getThumbnailUrl(),
                course.getPrice(),
                course.isPublished(),
                course.isFreeCourse(),
                course.getCreatedAt()
        );
    }
}