package com.cyvanta.backend.service;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.googleapis.media.MediaHttpUploader;
import com.google.api.client.http.InputStreamContent;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.Video;
import com.google.api.services.youtube.model.VideoSnippet;
import com.google.api.services.youtube.model.VideoStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class YouTubeService {

    @Value("${youtube.client-id}")
    private String clientId;

    @Value("${youtube.client-secret}")
    private String clientSecret;

    @Value("${youtube.refresh-token}")
    private String refreshToken;

    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

    private Credential getCredentials() {
        return new GoogleCredential.Builder()
                .setTransport(new com.google.api.client.http.javanet.NetHttpTransport())
                .setJsonFactory(JSON_FACTORY)
                .setClientSecrets(clientId, clientSecret)
                .build()
                .setRefreshToken(refreshToken);
    }

    private YouTube getYouTubeService() throws GeneralSecurityException, IOException {
        final com.google.api.client.http.HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
        return new YouTube.Builder(httpTransport, JSON_FACTORY, getCredentials())
                .setApplicationName("CyvantaLMS")
                .build();
    }

    public Map<String, String> uploadVideo(MultipartFile file, String title, String description) throws GeneralSecurityException, IOException {
        YouTube youtubeService = getYouTubeService();

        Video videoObjectDefiningMetadata = new Video();

        VideoStatus status = new VideoStatus();
        status.setPrivacyStatus("unlisted");
        videoObjectDefiningMetadata.setStatus(status);

        VideoSnippet snippet = new VideoSnippet();
        snippet.setTitle(title);
        snippet.setDescription(description);
        videoObjectDefiningMetadata.setSnippet(snippet);

        InputStreamContent mediaContent = new InputStreamContent(
                file.getContentType(),
                new BufferedInputStream(file.getInputStream())
        );
        mediaContent.setLength(file.getSize());

        YouTube.Videos.Insert videoInsertRequest = youtubeService.videos()
                .insert(Collections.singletonList("snippet,statistics,status"), videoObjectDefiningMetadata, mediaContent);

        MediaHttpUploader uploader = videoInsertRequest.getMediaHttpUploader();
        uploader.setDirectUploadEnabled(false);
        uploader.setChunkSize(MediaHttpUploader.MINIMUM_CHUNK_SIZE);

        Video returnedVideo = videoInsertRequest.execute();

        Map<String, String> resultMap = new HashMap<>();
        resultMap.put("youtubeVideoId", returnedVideo.getId());
        return resultMap;
    }
}
