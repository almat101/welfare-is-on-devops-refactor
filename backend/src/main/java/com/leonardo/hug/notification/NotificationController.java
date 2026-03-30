package com.leonardo.hug.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.firebase.messaging.FirebaseMessagingException;
import io.swagger.v3.oas.annotations.tags.Tag; 


@RestController
@RequestMapping("/notifications")
@Tag(name = "Notification")
public class NotificationController {

    @Autowired
    private  PushNotificationService pushNotificationService;
    // @Autowired
    // private NotificationTokenService tokenService;


   
    // @PostMapping("/updateToken")
    // public String updateNotificationToken(
    //         @RequestParam int userId,
    //         @RequestParam String token) {
    //     try {
    //         tokenService.updateTokenForUser(userId, token);
    //         return "Token updated successfully";
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //         return "Failed to update token: " + e.getMessage();
    //     }
    // }

    @GetMapping("/send")
    public String sendNotification(@RequestParam String token, @RequestParam String title, @RequestParam String message) {
        try {
            pushNotificationService.sendPushNotification(token, title, message);
            return "Notification sent successfully";
        } catch (FirebaseMessagingException e) {
            e.printStackTrace();
            return "Failed to send notification: " + e.getMessage();
        }
    }

    @PostMapping("/sendAll")
    public String sendNotificationToAllDevices(@RequestBody String title, @RequestBody String message) {
        try {
            pushNotificationService.sendPushNotificationToAllDevices(title, message);
            return "Notification sent successfully";
        } catch (FirebaseMessagingException e) {
            e.printStackTrace();
            return "Failed to send notification: " + e.getMessage();
        }
    }

    @PostMapping("/sendGroup")
    public String sendNotificationToGroup(@RequestBody String title, @RequestBody String message, @RequestBody String group) {
        try {
            pushNotificationService.sendPushNotificationToGroup(title, message, group);
            return "Notification sent successfully";
        } catch (FirebaseMessagingException e) {
            e.printStackTrace();
            return "Failed to send notification: " + e.getMessage();
        }
    }
}

