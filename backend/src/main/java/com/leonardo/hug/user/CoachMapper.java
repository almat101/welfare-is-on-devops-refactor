package com.leonardo.hug.user;

public class CoachMapper {

    public static CoachResponse toCoachResponse(User user) {
        return CoachResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firsname(user.getFirstname())
                .lastname(user.getLastname())
                .sede(user.getPersonalData().getSede())
                .reparto(user.getPersonalData().getReparto())
                .build();
    }
}
