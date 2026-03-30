package com.leonardo.hug.notification;

import java.io.FileInputStream;
import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Configuration
public class FirebaseConfig {

    @Bean
    public FirebaseApp initializeFirebase() throws IOException {
        String path = System.getenv("FIREBASE_CREDENTIALS_PATH");
        FileInputStream serviceAccount =
        new FileInputStream(path);
        // new FileInputStream("src/main/resources/leonardo-7abf7-firebase-adminsdk-rtfdb-c22e0f1580.json");

        @SuppressWarnings("deprecation")
        FirebaseOptions options = new FirebaseOptions.Builder()
        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
        .build();

        return FirebaseApp.initializeApp(options);

    }
}
