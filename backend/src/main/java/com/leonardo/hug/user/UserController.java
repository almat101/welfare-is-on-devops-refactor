package com.leonardo.hug.user;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping
@RequiredArgsConstructor
@Tag(name = "User")
public class UserController {

    private final UserService service;
    
    @GetMapping("userinfo")     
    public ResponseEntity<UserResponse> getUser(Authentication connectedUser){
        return ResponseEntity.ok(service.getUserInfo(connectedUser));
    }

    @GetMapping("coachinfo")
    public ResponseEntity<Page<CoachResponse>> getCoach(
                @RequestParam(value = "page", defaultValue = "0") int page,
                @RequestParam(value = "size", defaultValue = "10") int size,
                Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.getCoachInfo(page, size, connectedUser));
    }

    @PostMapping("location")
    public ResponseEntity<Void> updateLocation(@RequestParam double latitude, @RequestParam double longitude, Authentication connectedUser){
        service.updateLocation(latitude, longitude, connectedUser);
        return ResponseEntity.ok().build();
    }

}