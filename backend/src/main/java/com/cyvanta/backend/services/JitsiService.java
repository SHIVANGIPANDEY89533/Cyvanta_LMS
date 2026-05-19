package com.cyvanta.backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Service
public class JitsiService {

    @Value("${jitsi.domain:meet.jit.si}")
    private String jitsiDomain;

    public String generateRoomName(String courseId, String title, LocalDateTime scheduledAt) {
        String sanitizedTitle = title == null ? "live-session" : title.toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");

        String timestamp = scheduledAt == null
                ? String.valueOf(System.currentTimeMillis())
                : scheduledAt.format(DateTimeFormatter.ofPattern("yyyyMMddHHmm"));

        return String.format("%s-%s-%s", courseId, sanitizedTitle, timestamp);
    }

    public String buildMeetingLink(String roomName) {
        String normalizedRoom = roomName == null ? "live-session" : roomName.trim();
        return String.format("https://%s/%s", jitsiDomain, normalizedRoom);
    }
}
