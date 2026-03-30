package com.leonardo.hug.user;

public class UserMapper {

    public static UserResponse toUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firsname(user.getFirstname())
                .lastname(user.getLastname())
                .saved(user.getSaved())
                .build();
    }
    
}
