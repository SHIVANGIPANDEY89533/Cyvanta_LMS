package com.cyvanta.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;
    private final String folder;

    public CloudinaryService(Cloudinary cloudinary,
                             @Value("${cloudinary.folder}") String folder) {
        this.cloudinary = cloudinary;
        this.folder = folder;
    }

    public Map uploadVideo(MultipartFile file) throws IOException {
        return upload(file, "video");
    }

    public Map uploadImage(MultipartFile file) throws IOException {
        return upload(file, "image");
    }

    private Map upload(MultipartFile file, String resourceType) throws IOException {
        return cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "resource_type", resourceType,
                "folder", folder,
                "overwrite", true
        ));
    }
}
