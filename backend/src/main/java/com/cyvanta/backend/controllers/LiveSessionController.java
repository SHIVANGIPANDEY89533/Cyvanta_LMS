package com.cyvanta.backend.controllers;

import com.cyvanta.backend.dto.CreateLiveSessionRequest;
import com.cyvanta.backend.dto.JoinLiveSessionResponse;
import com.cyvanta.backend.models.LiveSession;
import com.cyvanta.backend.service.LiveSessionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/live-sessions")
@CrossOrigin("*")
public class LiveSessionController {

    private final LiveSessionService liveSessionService;

    public LiveSessionController(LiveSessionService liveSessionService) {
        this.liveSessionService = liveSessionService;
    }

    @PostMapping
    public ResponseEntity<JoinLiveSessionResponse> createLiveSession(@RequestBody CreateLiveSessionRequest request) {
        LiveSession session = liveSessionService.createLiveSession(request);
        return ResponseEntity.ok(toResponse(session));
    }

    @PostMapping("/jitsi")
    public ResponseEntity<JoinLiveSessionResponse> createLiveSessionWithJitsi(@RequestBody CreateLiveSessionRequest request) {
        LiveSession session = liveSessionService.createLiveSession(request);
        return ResponseEntity.ok(toResponse(session));
    }

    @GetMapping
    public ResponseEntity<List<JoinLiveSessionResponse>> getAllLiveSessions() {
        List<LiveSession> sessions = liveSessionService.getAllLiveSessions();
        return ResponseEntity.ok(sessions.stream().map(this::toResponse).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<JoinLiveSessionResponse> getLiveSessionById(@PathVariable String id) {
        return ResponseEntity.ok(toResponse(liveSessionService.getLiveSessionById(id)));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<JoinLiveSessionResponse>> getLiveSessionsByCourse(@PathVariable String courseId) {
        List<LiveSession> sessions = liveSessionService.getLiveSessionsByCourseId(courseId);
        return ResponseEntity.ok(sessions.stream().map(this::toResponse).collect(Collectors.toList()));
    }

    @PostMapping("/{id}/start")
    public ResponseEntity<JoinLiveSessionResponse> startLiveSession(@PathVariable String id) {
        return ResponseEntity.ok(toResponse(liveSessionService.startLiveSession(id)));
    }

    @PostMapping("/{id}/end")
    public ResponseEntity<JoinLiveSessionResponse> endLiveSession(@PathVariable String id) {
        return ResponseEntity.ok(toResponse(liveSessionService.endLiveSession(id)));
    }

    private JoinLiveSessionResponse toResponse(LiveSession session) {
        return new JoinLiveSessionResponse(
                session.getId(),
                session.getRoomName(),
                session.getMeetingLink(),
                session.getScheduledAt(),
                session.getStatus(),
                session.isRecordingAvailable()
        );
    }
}
