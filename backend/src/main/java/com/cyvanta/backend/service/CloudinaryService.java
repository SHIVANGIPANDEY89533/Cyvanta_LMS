package com.cyvanta.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryService {

    private static final Logger logger = LoggerFactory.getLogger(CloudinaryService.class);

    private final Cloudinary cloudinary;
    private final String folder;
    private final String cloudName;
    private final String apiKey;
    private final String apiSecret;
    private final Path localUploadRoot;

    public CloudinaryService(Cloudinary cloudinary,
                             @Value("${cloudinary.folder}") String folder,
                             @Value("${cloudinary.cloud-name}") String cloudName,
                             @Value("${cloudinary.api-key}") String apiKey,
                             @Value("${cloudinary.api-secret}") String apiSecret,
                             @Value("${file.upload-dir:uploads}") String uploadDir) {
        this.cloudinary = cloudinary;
        this.folder = folder;
        this.cloudName = cloudName;
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.localUploadRoot = Paths.get(uploadDir).toAbsolutePath().normalize();
    }

    public Map uploadVideo(MultipartFile file) throws IOException {
        return upload(file, "video");
    }

    public Map uploadImage(MultipartFile file) throws IOException {
        return upload(file, "image");
    }

    private Map upload(MultipartFile file, String resourceType) throws IOException {
        if (!isCloudinaryConfigured()) {
            logger.warn("Cloudinary is not configured properly, falling back to local file storage.");
            return uploadLocally(file, resourceType);
        }

        try {
            return cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                    "resource_type", resourceType,
                    "folder", folder,
                    "overwrite", true
            ));
        } catch (Exception e) {
            logger.error("Cloudinary upload failed, falling back to local storage.", e);
            return uploadLocally(file, resourceType);
        }
    }

    private boolean isCloudinaryConfigured() {
        return cloudName != null && !cloudName.contains("your-cloud-name")
                && apiKey != null && !apiKey.contains("your-api-key")
                && apiSecret != null && !apiSecret.contains("your-api-secret");
    }

    private Map uploadLocally(MultipartFile file, String resourceType) throws IOException {
        Path targetDir = localUploadRoot.resolve(resourceType);
        Files.createDirectories(targetDir);

        String filename = System.currentTimeMillis() + "-" + file.getOriginalFilename().replaceAll("[^a-zA-Z0-9._-]", "_");
        Path target = targetDir.resolve(filename);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        Map<String, Object> result = new HashMap<>();
        result.put("public_id", resourceType + "/" + filename);
        result.put("secure_url", "/uploads/" + resourceType + "/" + filename);
        return result;
    }
}
