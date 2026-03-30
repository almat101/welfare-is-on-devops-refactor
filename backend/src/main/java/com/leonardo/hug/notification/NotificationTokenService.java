package com.leonardo.hug.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leonardo.hug.user.User;
import com.leonardo.hug.user.UserRepository;

@Service
public class NotificationTokenService {

    // @Autowired
    // private NotificationTokenRepository tokenRepository;

    // @Autowired
    // private UserRepository userRepository;

    // public void updateTokenForUser(int userId, String newToken) {
    //     User user = userRepository.findById(userId)
    //         .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
    //     NotificationToken token = tokenRepository.findByUserId(userId);
    //     if (token == null) {
    //         token = new NotificationToken();
    //         token.setUser(user);
    //     }
    //     token.setToken(newToken);
    //     tokenRepository.save(token);
    // }
}

