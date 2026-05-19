package com.cyvanta.backend.controllers;

import com.cyvanta.backend.dto.JoinLiveSessionResponse;
import com.cyvanta.backend.models.LiveSession;
import com.cyvanta.backend.service.LiveSessionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/student")
@CrossOrigin("*")
public class StudentLiveSessionController {

    private final LiveSessionService liveSessionService;

    public StudentLiveSessionController(LiveSessionService liveSessionService) {
        this.liveSessionService = liveSessionService;
    }

    @GetMapping("/courses/{courseId}/live-sessions")
    public ResponseEntity<List<JoinLiveSessionResponse>> getCourseLiveSessions(@PathVariable String courseId) {
        List<LiveSession> sessions = liveSessionService.getLiveSessionsByCourseId(courseId);
        return ResponseEntity.ok(sessions.stream().map(this::toResponse).collect(Collectors.toList()));
    }

    @GetMapping("/live-sessions/{id}")
    public ResponseEntity<JoinLiveSessionResponse> getLiveSessionById(@PathVariable String id) {
        return ResponseEntity.ok(toResponse(liveSessionService.getLiveSessionById(id)));
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
