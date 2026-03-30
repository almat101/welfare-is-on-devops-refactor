package com.leonardo.hug.handler;

import org.springframework.http.HttpStatus;

import lombok.Getter;

public enum BusinessErrorCodes {
    
    NO_CODE(0, HttpStatus.NOT_IMPLEMENTED, "Nessun Codice"),
    INCORRECT_CURRENT_PASSWORD(300, HttpStatus.BAD_REQUEST, "Password Errata"),
    INCORRECT_DOES_NOT_MATCH(301, HttpStatus.BAD_REQUEST, "La password non corrisponde"),
    ACCOUNT_LOCKED(302, HttpStatus.FORBIDDEN, "Account Bloccato"),
    ACCOUNT_DISABLED(303, HttpStatus.FORBIDDEN, "Account Disabilitato"),
    BAD_CREDENTIAL(304, HttpStatus.FORBIDDEN, "Email o Password Errati"),
    ;

    @Getter
    private final int code;
    @Getter
    private final String description;
    @Getter
    private final  HttpStatus httpStatus;

    BusinessErrorCodes(int code, HttpStatus httpStatus, String description) {
        this.code = code;
        this.description = description;
        this.httpStatus = httpStatus;
    }

}
