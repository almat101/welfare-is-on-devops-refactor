package com.leonardo.hug.personal_data;

import java.time.LocalDate;

import jakarta.validation.constraints.Pattern;


public record PersonalDataRequest(
        Gender gender,
        boolean married,
        LocalDate birthdate,
        boolean elderlyParents,
        boolean children,
        @Pattern(regexp = "\\d+", message = "Inserisci un numero di telefono valido")
        String mobileNumber,
        String sede,
        String reparto
        )
    {
}
