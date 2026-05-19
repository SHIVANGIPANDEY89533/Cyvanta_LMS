package com.cyvanta.backend.dto;

import com.cyvanta.backend.enums.LiveSessionStatus;

public class CreateLiveSessionRequest {

    private String courseId;
    private String title;
    private String roomName;
    private String meetingLink;
    private String scheduledAt;
    private LiveSessionStatus status;

    public CreateLiveSessionRequest() {
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public String getScheduledAt() {
        return scheduledAt;
    }

    public void setScheduledAt(String scheduledAt) {
        this.scheduledAt = scheduledAt;
    }

    public LiveSessionStatus getStatus() {
        return status;
    }

    public void setStatus(LiveSessionStatus status) {
        this.status = status;
    }
}
