package com.cyvanta.backend.service;

import com.cyvanta.backend.dto.CreateLiveSessionRequest;
import com.cyvanta.backend.exceptions.ResourceNotFoundException;
import com.cyvanta.backend.models.LiveSession;
import com.cyvanta.backend.repositories.LiveSessionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LiveSessionService {

    private final LiveSessionRepository liveSessionRepository;

    public LiveSessionService(LiveSessionRepository liveSessionRepository) {
        this.liveSessionRepository = liveSessionRepository;
    }

    public LiveSession createLiveSession(CreateLiveSessionRequest request) {
        LocalDateTime scheduledAt = request.getScheduledAt() == null || request.getScheduledAt().isBlank()
                ? LocalDateTime.now()
                : LocalDateTime.parse(request.getScheduledAt());

        LiveSession liveSession = new LiveSession();
        liveSession.setCourseId(request.getCourseId()); // Course ID might be optional for general sessions
        liveSession.setTitle(request.getTitle());
        liveSession.setDescription(request.getDescription());
        liveSession.setYoutubeUrl(request.getYoutubeUrl());
        liveSession.setThumbnailUrl(request.getThumbnailUrl());
        liveSession.setScheduledAt(scheduledAt);
        if (request.getStatus() != null) {
            liveSession.setStatus(request.getStatus());
        }
        liveSession.setRecordingAvailable(false);

        return liveSessionRepository.save(liveSession);
    }

    public List<LiveSession> getAllLiveSessions() {
        return liveSessionRepository.findAll();
    }

    public LiveSession getLiveSessionById(String id) {
        return liveSessionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Live session not found with id: " + id));
    }

    public List<LiveSession> getLiveSessionsByCourseId(String courseId) {
        return liveSessionRepository.findByCourseId(courseId);
    }

    public LiveSession startLiveSession(String id) {
        LiveSession liveSession = getLiveSessionById(id);
        liveSession.setStatus(com.cyvanta.backend.enums.LiveSessionStatus.LIVE);
        return liveSessionRepository.save(liveSession);
    }

    public LiveSession endLiveSession(String id) {
        LiveSession liveSession = getLiveSessionById(id);
        liveSession.setStatus(com.cyvanta.backend.enums.LiveSessionStatus.ENDED);
        return liveSessionRepository.save(liveSession);
    }

    public LiveSession updateStatus(String id, String status) {
        LiveSession liveSession = getLiveSessionById(id);
        if (status != null && !status.isBlank()) {
            liveSession.setStatus(com.cyvanta.backend.enums.LiveSessionStatus.valueOf(status.toUpperCase()));
        }
        return liveSessionRepository.save(liveSession);
    }
}
