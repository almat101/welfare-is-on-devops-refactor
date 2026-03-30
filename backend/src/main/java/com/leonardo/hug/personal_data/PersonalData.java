package com.leonardo.hug.personal_data;

import java.time.LocalDate;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PersonalData {
    
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Gender gender = Gender.NON_SPECIFICATO;
    @Builder.Default
    private boolean married = false;
    @Builder.Default
    private boolean children  = false;;
    @Past (message = "Non puoi non essere ancora nato!")
    private LocalDate birthdate;
    @Builder.Default
    private boolean elderlyParents  = false;;
    @Pattern(regexp = "\\d+", message = "Inserisci un numero di telefono valido")
    private String mobileNumber;
    private String sede;
    private String reparto;
}
