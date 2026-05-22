package com.cyvanta.backend.controllers;

import com.cyvanta.backend.dto.CourseResponse;
import com.cyvanta.backend.dto.PlayRecordingResponse;
import com.cyvanta.backend.dto.VideoResponse;
import com.cyvanta.backend.models.Course;
import com.cyvanta.backend.models.Recording;
import com.cyvanta.backend.models.Video;
import com.cyvanta.backend.service.CourseService;
import com.cyvanta.backend.service.LiveSessionService;
import com.cyvanta.backend.service.RecordingService;
import com.cyvanta.backend.service.VideoService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/student/courses")
@CrossOrigin("*")
public class StudentCourseController {

    private final CourseService courseService;
    private final VideoService videoService;
    private final RecordingService recordingService;

    public StudentCourseController(CourseService courseService,
                                   VideoService videoService,
                                   RecordingService recordingService) {
        this.courseService = courseService;
        this.videoService = videoService;
        this.recordingService = recordingService;
    }

    @GetMapping
    public ResponseEntity<List<CourseResponse>> listPublishedCourses() {
        List<Course> courses = courseService.getPublishedCourses();
        return ResponseEntity.ok(courses.stream().map(this::toResponse).collect(Collectors.toList()));
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<CourseResponse> getCourse(@PathVariable String courseId) {
        return ResponseEntity.ok(toResponse(courseService.getCourseById(courseId)));
    }

    @GetMapping("/{courseId}/videos")
    public ResponseEntity<List<VideoResponse>> getCourseVideos(@PathVariable String courseId) {
        List<Video> videos = videoService.getVideosByCourseId(courseId);
        return ResponseEntity.ok(videos.stream().map(this::toResponse).collect(Collectors.toList()));
    }

    @GetMapping("/{courseId}/recordings")
    public ResponseEntity<List<PlayRecordingResponse>> getCourseRecordings(@PathVariable String courseId) {
        List<Recording> recordings = recordingService.getRecordingsByCourseId(courseId);
        return ResponseEntity.ok(recordings.stream().map(this::toRecordingResponse).collect(Collectors.toList()));
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

    private VideoResponse toResponse(Video video) {
        return new VideoResponse(
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
        );
    }

    private PlayRecordingResponse toRecordingResponse(Recording recording) {
        return new PlayRecordingResponse(
                recording.getId(),
                recording.getTitle(),
                recording.getSecureUrl(),
                recording.getStatus().name()
        );
    }
}