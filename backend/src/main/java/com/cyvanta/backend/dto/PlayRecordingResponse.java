package com.cyvanta.backend.dto;

public class PlayRecordingResponse {

    private String id;
    private String title;
    private String secureUrl;
    private String status;

    public PlayRecordingResponse() {
    }

    public PlayRecordingResponse(String id, String title, String secureUrl, String status) {
        this.id = id;
        this.title = title;
        this.secureUrl = secureUrl;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSecureUrl() {
        return secureUrl;
    }

    public void setSecureUrl(String secureUrl) {
        this.secureUrl = secureUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
