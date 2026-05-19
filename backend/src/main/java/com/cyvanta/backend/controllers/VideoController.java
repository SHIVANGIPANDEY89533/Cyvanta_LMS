package com.cyvanta.backend.controllers;

import com.cyvanta.backend.dto.VideoResponse;
import com.cyvanta.backend.models.Video;
import com.cyvanta.backend.service.VideoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/videos")
@CrossOrigin("*")
public class VideoController {

    private final VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @PostMapping("/upload")
    public ResponseEntity<VideoResponse> uploadVideo(
                                                     @RequestParam("courseId") String courseId,
                                                     @RequestParam("title") String title,
                                                     @RequestParam(value = "description", required = false) String description,
                                                     @RequestParam(value = "freeVideo", defaultValue = "false") boolean freeVideo,
                                                     @RequestPart("file") MultipartFile file) throws IOException {
        Video video = videoService.uploadVideo(courseId, file, title, description, freeVideo);
        return ResponseEntity.ok(toResponse(video));
    }

    @GetMapping
    public ResponseEntity<List<VideoResponse>> getAllVideos() {
        List<Video> videos = videoService.getAllVideos();
        return ResponseEntity.ok(videos.stream().map(this::toResponse).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VideoResponse> getVideoById(@PathVariable String id) {
        return ResponseEntity.ok(toResponse(videoService.getVideoById(id)));
    }

    private VideoResponse toResponse(Video video) {
        return new VideoResponse(
                video.getId(),
                video.getCourseId(),
                video.getTitle(),
                video.getDescription(),
                video.getCloudinaryPublicId(),
                video.getSecureUrl(),
                video.isFreeVideo(),
                video.isPublished(),
                video.getCreatedAt()
        );
    }
}
