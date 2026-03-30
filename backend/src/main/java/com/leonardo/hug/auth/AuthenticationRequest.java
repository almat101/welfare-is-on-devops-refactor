package com.leonardo.hug.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Builder
public class AuthenticationRequest {

    @Email(message = "Inserire un indirizzo email valido")
    @NotEmpty(message = "Inserire un indirizzo email")
    @NotNull(message = "Inserire un indirizzo email")
    private String email;

    @NotEmpty(message = "Inserire una password")
    @NotNull(message = "La password non può essere nulla")
    @Size(min = 8, message = "La password deve contenere almeno 8 caratteri")
    private String password;
}

