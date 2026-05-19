package com.cyvanta.backend.service;

import com.cyvanta.backend.dto.CreateLiveSessionRequest;
import com.cyvanta.backend.exceptions.ResourceNotFoundException;
import com.cyvanta.backend.models.Course;
import com.cyvanta.backend.models.LiveSession;
import com.cyvanta.backend.repositories.CourseRepository;
import com.cyvanta.backend.repositories.LiveSessionRepository;
import com.cyvanta.backend.service.JitsiService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LiveSessionService {

    private final LiveSessionRepository liveSessionRepository;
    private final CourseRepository courseRepository;
    private final JitsiService jitsiService;

    public LiveSessionService(LiveSessionRepository liveSessionRepository,
                              CourseRepository courseRepository,
                              JitsiService jitsiService) {
        this.liveSessionRepository = liveSessionRepository;
        this.courseRepository = courseRepository;
        this.jitsiService = jitsiService;
    }

    public LiveSession createLiveSession(CreateLiveSessionRequest request) {
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + request.getCourseId()));

        LocalDateTime scheduledAt = request.getScheduledAt() == null || request.getScheduledAt().isBlank()
                ? LocalDateTime.now()
                : LocalDateTime.parse(request.getScheduledAt());

        String roomName = request.getRoomName();
        if (roomName == null || roomName.isBlank()) {
            roomName = jitsiService.generateRoomName(course.getId(), request.getTitle(), scheduledAt);
        }

        String meetingLink = request.getMeetingLink();
        if (meetingLink == null || meetingLink.isBlank()) {
            meetingLink = jitsiService.buildMeetingLink(roomName);
        }

        LiveSession liveSession = new LiveSession();
        liveSession.setCourseId(course.getId());
        liveSession.setTitle(request.getTitle());
        liveSession.setRoomName(roomName);
        liveSession.setMeetingLink(meetingLink);
        liveSession.setScheduledAt(scheduledAt);
        liveSession.setStatus(request.getStatus() != null ? request.getStatus() : liveSession.getStatus());
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
