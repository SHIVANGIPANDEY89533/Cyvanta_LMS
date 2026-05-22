package com.cyvanta.backend.controllers;

import com.cyvanta.backend.service.YouTubeService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/youtube")
@CrossOrigin("*")
public class YouTubeAuthController {

    private final YouTubeService youTubeService;

    public YouTubeAuthController(YouTubeService youTubeService) {
        this.youTubeService = youTubeService;
    }

    @GetMapping("/authorize")
    public ResponseEntity<Map<String, String>> authorize() {
        try {
            String authUrl = youTubeService.getAuthorizationUrl();
            return ResponseEntity.ok(Map.of(
                    "authUrl", authUrl,
                    "message", "Open this URL in your browser to authorize YouTube access"
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Failed to generate auth URL: " + e.getMessage()));
        }
    }

    @GetMapping("/callback")
    public ResponseEntity<String> callback(@RequestParam("code") String code) {
        try {
            youTubeService.exchangeCodeForTokens(code);
            return ResponseEntity.ok("""
                <html>
                  <body style="font-family: sans-serif; display:flex; justify-content:center; align-items:center; height:100vh; margin:0; background:#0f172a; color:#e2e8f0;">
                    <div style="text-align:center; padding:2rem; background:#1e293b; border-radius:12px; max-width:400px;">
                      <div style="font-size:3rem; margin-bottom:1rem;">✅</div>
                      <h2 style="color:#22c55e; margin-bottom:0.5rem;">YouTube Connected!</h2>
                      <p>Your YouTube account has been authorized successfully.<br/>You can now close this tab and upload videos from the Admin Dashboard.</p>
                    </div>
                  </body>
                </html>
                """);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    "<html><body><h2>❌ Authorization failed: " + e.getMessage() + "</h2></body></html>"
            );
        }
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> status() {
        boolean authorized = youTubeService.isAuthorized();
        return ResponseEntity.ok(Map.of(
                "authorized", authorized,
                "message", authorized
                        ? "YouTube is connected. Videos will be uploaded as Unlisted."
                        : "YouTube is NOT connected. Visit /api/youtube/authorize to connect."
        ));
    }
}