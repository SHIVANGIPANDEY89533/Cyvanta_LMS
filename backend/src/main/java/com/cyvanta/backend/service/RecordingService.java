package com.cyvanta.backend.service;

import com.cyvanta.backend.enums.RecordingStatus;
import com.cyvanta.backend.exceptions.ResourceNotFoundException;
import com.cyvanta.backend.models.LiveSession;
import com.cyvanta.backend.models.Recording;
import com.cyvanta.backend.repositories.LiveSessionRepository;
import com.cyvanta.backend.repositories.RecordingRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class RecordingService {

    private final RecordingRepository recordingRepository;
    private final LiveSessionRepository liveSessionRepository;
    private final CloudinaryService cloudinaryService;

    public RecordingService(RecordingRepository recordingRepository,
                            LiveSessionRepository liveSessionRepository,
                            CloudinaryService cloudinaryService) {
        this.recordingRepository = recordingRepository;
        this.liveSessionRepository = liveSessionRepository;
        this.cloudinaryService = cloudinaryService;
    }

    public Recording uploadRecording(String courseId,
                                     String liveSessionId,
                                     MultipartFile file,
                                     String title) throws IOException {
        LiveSession liveSession = liveSessionRepository.findById(liveSessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Live session not found with id: " + liveSessionId));

        Map uploadResult = cloudinaryService.uploadVideo(file);

        Recording recording = new Recording();
        recording.setCourseId(courseId);
        recording.setLiveSessionId(liveSessionId);
        recording.setTitle(title);
        recording.setCloudinaryPublicId((String) uploadResult.get("public_id"));
        recording.setSecureUrl((String) uploadResult.get("secure_url"));
        recording.setStatus(RecordingStatus.READY);

        Recording saved = recordingRepository.save(recording);
        liveSession.setRecordingAvailable(true);
        liveSessionRepository.save(liveSession);
        return saved;
    }

    public List<Recording> getAllRecordings() {
        return recordingRepository.findAll();
    }

    public List<Recording> getRecordingsByCourseId(String courseId) {
        return recordingRepository.findByCourseId(courseId);
    }

    public Recording getRecordingById(String id) {
        return recordingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recording not found with id: " + id));
    }
}
