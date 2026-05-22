package com.cyvanta.backend.service;

import com.cyvanta.backend.exceptions.ResourceNotFoundException;
import com.cyvanta.backend.models.Course;
import com.cyvanta.backend.models.Video;
import com.cyvanta.backend.repositories.CourseRepository;
import com.cyvanta.backend.repositories.VideoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class VideoService {

    private final VideoRepository videoRepository;
    private final CourseRepository courseRepository;
    private final YouTubeService youtubeService;

    public VideoService(VideoRepository videoRepository,
                        CourseRepository courseRepository,
                        YouTubeService youtubeService) {
        this.videoRepository = videoRepository;
        this.courseRepository = courseRepository;
        this.youtubeService = youtubeService;
    }

    public Video uploadVideo(String courseId,
                             MultipartFile file,
                             String title,
                             String description,
                             boolean freeVideo,
                             String thumbnailUrl) throws IOException, java.security.GeneralSecurityException {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        Map<String, String> uploadResult = youtubeService.uploadVideo(file, title, description);

        Video video = new Video();
        video.setCourseId(course.getId());
        video.setTitle(title);
        video.setDescription(description);
        video.setYoutubeVideoId(uploadResult.get("youtubeVideoId"));
        video.setThumbnailUrl(thumbnailUrl);
        video.setFreeVideo(freeVideo);
        video.setPublished(true);

        return videoRepository.save(video);
    }

    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    public Video getVideoById(String id) {
        return videoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Video not found with id: " + id));
    }

    public List<Video> getVideosByCourseId(String courseId) {
        return videoRepository.findByCourseId(courseId);
    }
}
