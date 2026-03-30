package com.leonardo.hug.personal_data;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/personal-data")
@RequiredArgsConstructor
@Tag(name = "Personal Data")
public class PersonalDataController {

    private final PersonalDataService service;

    @PostMapping
    public ResponseEntity<Integer> savePersonalData(@Valid @RequestBody PersonalDataRequest personalData, Authentication connectedUser){
        return ResponseEntity.ok(service.save(personalData, connectedUser));
    }

    @GetMapping
    public ResponseEntity<PersonalDataResponse> getPersonalData(Authentication connectedUser){
        return ResponseEntity.ok(service.findById(connectedUser));
    }
}
