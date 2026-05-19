package com.cyvanta.backend.dto;

import com.cyvanta.backend.enums.LiveSessionStatus;

import java.time.LocalDateTime;

public class JoinLiveSessionResponse {

    private String id;
    private String roomName;
    private String meetingLink;
    private LocalDateTime scheduledAt;
    private LiveSessionStatus status;
    private boolean recordingAvailable;

    public JoinLiveSessionResponse() {
    }

    public JoinLiveSessionResponse(String id, String roomName, String meetingLink, LocalDateTime scheduledAt, LiveSessionStatus status, boolean recordingAvailable) {
        this.id = id;
        this.roomName = roomName;
        this.meetingLink = meetingLink;
        this.scheduledAt = scheduledAt;
        this.status = status;
        this.recordingAvailable = recordingAvailable;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public String getMeetingLink() {
        return meetingLink;
    }

    public void setMeetingLink(String meetingLink) {
        this.meetingLink = meetingLink;
    }

    public LocalDateTime getScheduledAt() {
        return scheduledAt;
    }

    public void setScheduledAt(LocalDateTime scheduledAt) {
        this.scheduledAt = scheduledAt;
    }

    public LiveSessionStatus getStatus() {
        return status;
    }

    public void setStatus(LiveSessionStatus status) {
        this.status = status;
    }

    public boolean isRecordingAvailable() {
        return recordingAvailable;
    }

    public void setRecordingAvailable(boolean recordingAvailable) {
        this.recordingAvailable = recordingAvailable;
    }
}
