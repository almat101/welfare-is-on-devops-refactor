package com.leonardo.hug.gym;

import org.springframework.stereotype.Component;

@Component
public class GymMapper {

    public GymResponse toGymResponse(Gym gym, double latitude, double longitude) {
        return GymResponse.builder()
                .name(gym.getName())
                .address(gym.getAddress().getStreet() + ", " + gym.getAddress().getNumber() + " - " + gym.getAddress().getCity() + " - " + gym.getAddress().getPostalCode())
                .description(gym.getDescription())
                .image_url(gym.getImage_url())
                .link(gym.getLink())
                .phone(gym.getPhone())
                .distance(DistanceCalculator.calculateDistance(latitude, longitude, gym.getLatitude(), gym.getLongitude()))
                .build();
    }
}