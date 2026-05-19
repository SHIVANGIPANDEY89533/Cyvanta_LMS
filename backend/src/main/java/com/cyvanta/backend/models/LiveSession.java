package com.cyvanta.backend.models;

import com.cyvanta.backend.enums.LiveSessionStatus;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "live_sessions")
public class LiveSession {

    @Id
    private String id;

    private String courseId;
    private String title;
    private String roomName;
    private String meetingLink;
    private LocalDateTime scheduledAt;
    private LiveSessionStatus status;
    private boolean recordingAvailable;
    private LocalDateTime createdAt;

    public LiveSession() {
        this.status = LiveSessionStatus.SCHEDULED;
        this.recordingAvailable = false;
        this.createdAt = LocalDateTime.now();
    }

    public LiveSession(String courseId, String title, String roomName, String meetingLink, LocalDateTime scheduledAt) {
        this.courseId = courseId;
        this.title = title;
        this.roomName = roomName;
        this.meetingLink = meetingLink;
        this.scheduledAt = scheduledAt;
        this.status = LiveSessionStatus.SCHEDULED;
        this.recordingAvailable = false;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }

    public String getCourseId() {
        return courseId;
    }

    public String getTitle() {
        return title;
    }

    public String getRoomName() {
        return roomName;
    }

    public String getMeetingLink() {
        return meetingLink;
    }

    public LocalDateTime getScheduledAt() {
        return scheduledAt;
    }

    public LiveSessionStatus getStatus() {
        return status;
    }

    public boolean isRecordingAvailable() {
        return recordingAvailable;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public void setMeetingLink(String meetingLink) {
        this.meetingLink = meetingLink;
    }

    public void setScheduledAt(LocalDateTime scheduledAt) {
        this.scheduledAt = scheduledAt;
    }

    public void setStatus(LiveSessionStatus status) {
        this.status = status;
    }

    public void setRecordingAvailable(boolean recordingAvailable) {
        this.recordingAvailable = recordingAvailable;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}