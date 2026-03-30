package com.leonardo.hug.auth.uniqueemailvalidation;


import org.springframework.beans.factory.annotation.Autowired;

import com.leonardo.hug.user.UserRepository;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {

    @Autowired
    private UserRepository userRepository; 

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        if (email == null) {
            return false; 
        }
        return !userRepository.existsByEmail(email);
    }
}
