package com.leonardo.hug.gym;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GymResponse {

    private String name;
    
    private String address;
    
    private String description;
    
    private String image_url;
    
    private String link;
    
    private String phone;

    private double distance;
}
