package com.cyvanta.backend.controllers;

import com.cyvanta.backend.dto.PlayRecordingResponse;
import com.cyvanta.backend.dto.RecordingResponse;
import com.cyvanta.backend.models.Recording;
import com.cyvanta.backend.service.RecordingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/recordings")
@CrossOrigin("*")
public class RecordingController {

    private final RecordingService recordingService;

    public RecordingController(RecordingService recordingService) {
        this.recordingService = recordingService;
    }

    @PostMapping("/upload")
    public ResponseEntity<RecordingResponse> uploadRecording(
                                                             @RequestParam("courseId") String courseId,
                                                             @RequestParam("liveSessionId") String liveSessionId,
                                                             @RequestParam("title") String title,
                                                             @RequestPart("file") MultipartFile file) throws IOException {
        Recording recording = recordingService.uploadRecording(courseId, liveSessionId, file, title);
        return ResponseEntity.ok(toResponse(recording));
    }

    @GetMapping
    public ResponseEntity<List<RecordingResponse>> getAllRecordings() {
        List<Recording> recordings = recordingService.getAllRecordings();
        return ResponseEntity.ok(recordings.stream().map(this::toResponse).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlayRecordingResponse> getRecording(@PathVariable String id) {
        Recording recording = recordingService.getRecordingById(id);
        return ResponseEntity.ok(new PlayRecordingResponse(
                recording.getId(),
                recording.getTitle(),
                recording.getSecureUrl(),
                recording.getStatus().name()
        ));
    }

    private RecordingResponse toResponse(Recording recording) {
        return new RecordingResponse(
                recording.getId(),
                recording.getCourseId(),
                recording.getLiveSessionId(),
                recording.getTitle(),
                recording.getCloudinaryPublicId(),
                recording.getSecureUrl(),
                recording.getStatus(),
                recording.isFreePreview(),
                recording.getCreatedAt()
        );
    }
}
