package com.leonardo.hug.personal_data;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonalDataResponse {
    
    private Gender gender;
    private boolean married;
    private LocalDate birthdate;
    private boolean elderlyParents;
    private boolean children;
    private String mobileNumber;
    private String sede;
    private String reparto;
}
