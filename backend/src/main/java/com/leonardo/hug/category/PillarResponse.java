package com.leonardo.hug.category;

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
public class PillarResponse {
    
    int     id;
    String  name;
    String  description;
    String  image;

}
