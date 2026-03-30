package com.leonardo.hug.gym;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leonardo.hug.user.User;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Tag(name = "Gym")
public class GymController {
    
    private final GymService gymService;

    @GetMapping("/gym/nearest")
    public ResponseEntity<List<GymResponse>> getNearestGym(Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        double latitude = user.getLatitude();
        double longitude = user.getLongitude();
        return ResponseEntity.ok(gymService.getNearestGym(latitude, longitude));
    }
}