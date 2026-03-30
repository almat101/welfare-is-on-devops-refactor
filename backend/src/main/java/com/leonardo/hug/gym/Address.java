package com.leonardo.hug.gym;

import jakarta.persistence.Embeddable;
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
public class Address {

    private String street;
    private String number;
    private String city;
    private String postalCode;
    private String country;

}
