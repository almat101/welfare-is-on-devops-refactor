package com.leonardo.hug.gym;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GymService {
    
    private final GymRepository gymRepository;
    private final GymMapper gymMapper;

    @Transactional
    public List<GymResponse> getNearestGym(double latitude, double longitude) {
        List<Gym> gyms = gymRepository.findAllByDistanceOrderByDistance(latitude, longitude);
        
        return gyms.stream()
                   .map(gym -> gymMapper.toGymResponse(gym, latitude, longitude))
                   .collect(Collectors.toList());
    }
}