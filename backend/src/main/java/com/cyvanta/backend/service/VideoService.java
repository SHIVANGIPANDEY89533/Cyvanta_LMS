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
    private final CloudinaryService cloudinaryService;

    public VideoService(VideoRepository videoRepository,
                        CourseRepository courseRepository,
                        CloudinaryService cloudinaryService) {
        this.videoRepository = videoRepository;
        this.courseRepository = courseRepository;
        this.cloudinaryService = cloudinaryService;
    }

    public Video uploadVideo(String courseId,
                             MultipartFile file,
                             String title,
                             String description,
                             boolean freeVideo) throws IOException {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        Map uploadResult = cloudinaryService.uploadVideo(file);

        Video video = new Video();
        video.setCourseId(course.getId());
        video.setTitle(title);
        video.setDescription(description);
        video.setCloudinaryPublicId((String) uploadResult.get("public_id"));
        video.setSecureUrl((String) uploadResult.get("secure_url"));
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
