package com.cyvanta.backend.service;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.googleapis.media.MediaHttpUploader;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.InputStreamContent;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.YouTubeScopes;
import com.google.api.services.youtube.model.Video;
import com.google.api.services.youtube.model.VideoSnippet;
import com.google.api.services.youtube.model.VideoStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class YouTubeService {

    @Value("${youtube.client-id}")
    private String clientId;

    @Value("${youtube.client-secret}")
    private String clientSecret;

    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final String CREDENTIALS_DIRECTORY = ".oauth-credentials";
    private static final String USER_ID = "cyvanta-admin";
    private static final List<String> SCOPES = Collections.singletonList(YouTubeScopes.YOUTUBE_UPLOAD);
    private static final String CALLBACK_PATH = "/api/youtube/callback";

    private GoogleAuthorizationCodeFlow getFlow() throws GeneralSecurityException, IOException {
        HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
        FileDataStoreFactory dataStoreFactory = new FileDataStoreFactory(new File(CREDENTIALS_DIRECTORY));

        GoogleClientSecrets.Details details = new GoogleClientSecrets.Details();
        details.setClientId(clientId);
        details.setClientSecret(clientSecret);

        GoogleClientSecrets clientSecrets = new GoogleClientSecrets();
        clientSecrets.setInstalled(details);

        return new GoogleAuthorizationCodeFlow.Builder(
                httpTransport, JSON_FACTORY, clientSecrets, SCOPES)
                .setDataStoreFactory(dataStoreFactory)
                .setAccessType("offline")
                .build();
    }

    /**
     * Generate the Google OAuth authorization URL.
     * The admin visits this URL in their browser to authorize YouTube access.
     */
    public String getAuthorizationUrl(String redirectUri) throws GeneralSecurityException, IOException {
        return getFlow()
                .newAuthorizationUrl()
                .setRedirectUri(redirectUri)
                .build();
    }

    /**
     * Exchange the authorization code (received from Google callback) for tokens.
     * Tokens are automatically stored in the .oauth-credentials directory.
     */
    public void exchangeCodeForTokens(String code, String redirectUri) throws GeneralSecurityException, IOException {
        GoogleAuthorizationCodeFlow flow = getFlow();
        TokenResponse tokenResponse = flow.newTokenRequest(code)
                .setRedirectUri(redirectUri)
                .execute();
        flow.createAndStoreCredential(tokenResponse, USER_ID);
    }

    /**
     * Check if YouTube has been authorized (tokens exist).
     */
    public boolean isAuthorized() {
        try {
            Credential credential = getFlow().loadCredential(USER_ID);
            return credential != null && credential.getRefreshToken() != null;
        } catch (Exception e) {
            return false;
        }
    }

    private YouTube getYouTubeService() throws GeneralSecurityException, IOException {
        GoogleAuthorizationCodeFlow flow = getFlow();
        Credential credential = flow.loadCredential(USER_ID);

        if (credential == null || credential.getRefreshToken() == null) {
            throw new IllegalStateException(
                "YouTube is not authorized yet. Please visit /api/youtube/authorize to connect your YouTube account first.");
        }

        HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
        return new YouTube.Builder(httpTransport, JSON_FACTORY, credential)
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
