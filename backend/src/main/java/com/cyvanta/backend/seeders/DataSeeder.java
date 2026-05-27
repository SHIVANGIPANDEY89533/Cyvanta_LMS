package com.cyvanta.backend.seeders;

import com.cyvanta.backend.enums.LiveSessionStatus;
import com.cyvanta.backend.enums.RecordingStatus;
import com.cyvanta.backend.models.Course;
import com.cyvanta.backend.models.Enrollment;
import com.cyvanta.backend.models.LiveSession;
import com.cyvanta.backend.models.Recording;
import com.cyvanta.backend.models.Role;
import com.cyvanta.backend.models.User;
import com.cyvanta.backend.models.Video;
import com.cyvanta.backend.repositories.CourseRepository;
import com.cyvanta.backend.repositories.EnrollmentRepository;
import com.cyvanta.backend.repositories.LiveSessionRepository;
import com.cyvanta.backend.repositories.RecordingRepository;
import com.cyvanta.backend.repositories.RoleRepository;
import com.cyvanta.backend.repositories.UserRepository;
import com.cyvanta.backend.repositories.VideoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    private final MongoTemplate mongoTemplate;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final CourseRepository courseRepository;
    private final VideoRepository videoRepository;
    private final LiveSessionRepository liveSessionRepository;
    private final RecordingRepository recordingRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository,
                      RoleRepository roleRepository,
                      CourseRepository courseRepository,
                      VideoRepository videoRepository,
                      LiveSessionRepository liveSessionRepository,
                      RecordingRepository recordingRepository,
                      EnrollmentRepository enrollmentRepository,
                      MongoTemplate mongoTemplate,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.courseRepository = courseRepository;
        this.videoRepository = videoRepository;
        this.liveSessionRepository = liveSessionRepository;
        this.recordingRepository = recordingRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.mongoTemplate = mongoTemplate;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        System.out.println("Seeder started...");
        System.out.println("Connected DB: " + mongoTemplate.getDb().getName());

        Role adminRole = roleRepository.findByName("ADMIN")
                .orElseGet(() -> roleRepository.save(new Role("ADMIN")));

        Role studentRole = roleRepository.findByName("STUDENT")
                .orElseGet(() -> roleRepository.save(new Role("STUDENT")));

        User admin = userRepository.findByEmail("admin@cyvanta.com").orElseGet(() -> {
            User newAdmin = new User();
            newAdmin.setName("Super Admin");
            newAdmin.setEmail("admin@cyvanta.com");
            newAdmin.setPassword(passwordEncoder.encode("admin123"));
            newAdmin.setRole(adminRole);
            newAdmin.setActive(true);
            newAdmin.setCreatedAt(LocalDateTime.now());
            return userRepository.save(newAdmin);
        });

        if (admin.getRole() == null || !"ADMIN".equals(admin.getRole().getName())) {
            admin.setRole(adminRole);
            if (admin.getPassword() == null || !(admin.getPassword().startsWith("$2a$") || admin.getPassword().startsWith("$2b$") || admin.getPassword().startsWith("$2y$"))) {
                admin.setPassword(passwordEncoder.encode("admin123"));
            }
            userRepository.save(admin);
        }

        User student = userRepository.findByEmail("student@cyvanta.com").orElseGet(() -> {
            User newStudent = new User();
            newStudent.setName("Demo Student");
            newStudent.setEmail("student@cyvanta.com");
            newStudent.setPassword(passwordEncoder.encode("student123"));
            newStudent.setRole(studentRole);
            newStudent.setActive(true);
            newStudent.setCreatedAt(LocalDateTime.now());
            return userRepository.save(newStudent);
        });

        if (student.getRole() == null || !"STUDENT".equals(student.getRole().getName())) {
            student.setRole(studentRole);
            if (student.getPassword() == null || !(student.getPassword().startsWith("$2a$") || student.getPassword().startsWith("$2b$") || student.getPassword().startsWith("$2y$"))) {
                student.setPassword(passwordEncoder.encode("student123"));
            }
            userRepository.save(student);
        }

        if (courseRepository.count() == 0) {
            Course course = new Course();
            course.setTitle("Java Backend Mastery");
            course.setDescription("Spring Boot, MongoDB Atlas, JWT, Cloudinary");
            course.setThumbnailUrl("sample-thumbnail-url");
            // Convert price from dollars to rupees (1 USD = 83 INR as an example)
            course.setPrice(1999.0 * 83);
            course.setPublished(true);
            course.setFreeCourse(false);
            course.setCreatedAt(LocalDateTime.now());
            course = courseRepository.save(course);

            Video video = new Video();
            video.setCourseId(course.getId());
            video.setTitle("Introduction to Spring Boot");
            video.setDescription("This is a free intro lecture");
            video.setCloudinaryPublicId("sample-public-id");
            video.setSecureUrl("sample-secure-url");
            video.setFreeVideo(true);
            video.setPublished(true);
            video.setCreatedAt(LocalDateTime.now());
            videoRepository.save(video);

            LiveSession liveSession = new LiveSession();
            liveSession.setCourseId(course.getId());
            liveSession.setTitle("Live Q&A Session");
            liveSession.setDescription("This is a live session for Q&A.");
            liveSession.setYoutubeUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
            liveSession.setScheduledAt(LocalDateTime.now().plusDays(1));
            liveSession.setStatus(LiveSessionStatus.SCHEDULED);
            liveSession.setRecordingAvailable(false);
            liveSession.setCreatedAt(LocalDateTime.now());
            liveSession = liveSessionRepository.save(liveSession);

            Recording recording = new Recording();
            recording.setCourseId(course.getId());
            recording.setLiveSessionId(liveSession.getId());
            recording.setTitle("Recorded Q&A");
            recording.setCloudinaryPublicId("recording-public-id");
            recording.setSecureUrl("recording-secure-url");
            recording.setStatus(RecordingStatus.READY);
            recording.setFreePreview(false);
            recording.setCreatedAt(LocalDateTime.now());
            recordingRepository.save(recording);

            Enrollment enrollment = new Enrollment();
            enrollment.setStudentId(student.getId());
            enrollment.setCourseId(course.getId());
            enrollment.setActive(true);
            enrollment.setEnrolledAt(LocalDateTime.now());
            enrollmentRepository.save(enrollment);
        }

        System.out.println("Seed data inserted successfully.");
    }
}