package com.leonardo.hug.auth;

import com.leonardo.hug.auth.uniqueemailvalidation.UniqueEmail;

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
public class RegistrationRequest {


    @NotEmpty(message = "Inserire il nome")
    @NotNull(message = "Inserire il nome")
    private String firstname;
    @NotEmpty(message = "Inserire il cognome")
    @NotNull(message = "Inserire il cognome")
    private String lastname;
    @Email(message = "Inserire un indirizzo email valido")
    @NotEmpty(message = "Inserire un indirizzo email")
    @NotNull(message = "Inserire un indirizzo email")
    @UniqueEmail
    private String email;
    @NotEmpty(message = "Inserire una password")
    @NotNull(message = "La password non può essere nulla")
    @Size(min = 8, message = "La password deve contenere almeno 8 caratteri")
    private String password;
}
