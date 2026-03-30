package com.leonardo.hug.user;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponse getUserInfo(Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        return UserMapper.toUserResponse(user);
    }

    public Page<CoachResponse> getCoachInfo(int page, int size, Authentication connectedUser) {
        //User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size);
        Page<User> coachPage = userRepository.findAllByIsCoach(pageable);
        return coachPage.map(CoachMapper::toCoachResponse);
    }

    public void updateLocation(double latitude, double longitude, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        user.setLatitude(latitude);
        user.setLongitude(longitude);
        userRepository.save(user);
    }

    public Page<User> getAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(pageable);
    }

    public void setCoach(int userId, boolean isCoach) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setCoach(isCoach);
        userRepository.save(user);
    }
}
