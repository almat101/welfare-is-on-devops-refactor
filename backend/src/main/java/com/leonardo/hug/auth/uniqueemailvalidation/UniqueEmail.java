package com.leonardo.hug.auth.uniqueemailvalidation;


import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Payload;
import jakarta.validation.Constraint;

@Constraint(validatedBy = UniqueEmailValidator.class)
@Target({ ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueEmail {
    String message() default "L'email è già in uso";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
