package com.leonardo.hug.security;

import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class JasyptConfig {

    @Value("${MY_ENV_VAR}")
    private String myEnvVar;

    @Bean(name = "jasyptStringEncryptor")
    public StringEncryptor stringEncryptor() {
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setPassword(myEnvVar);
        return encryptor;
    }


}