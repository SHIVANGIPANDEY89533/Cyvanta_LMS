package com.cyvanta.backend.dto;

public class UpdateUserRequest {

    private String role;
    private Boolean active;

    public UpdateUserRequest() {
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}
