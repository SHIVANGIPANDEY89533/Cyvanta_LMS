package com.cyvanta.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    public Map<String, Object> uploadImage(MultipartFile file) throws Exception {
        return cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "resource_type", "image",
                "folder", folder,
                "overwrite", true
        ));
    }

    public Map<String, Object> uploadVideo(MultipartFile file) throws Exception {
        return cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "resource_type", "video",
                "folder", folder,
                "overwrite", true
        ));
    }
}