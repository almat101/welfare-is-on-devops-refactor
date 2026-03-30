package com.leonardo.hug.notification;

import org.springframework.stereotype.Service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;


@Service
public class PushNotificationService {

    public void sendPushNotification(String token, String title, String message) throws FirebaseMessagingException {
        Message msg = Message.builder()
            .setToken(token)
            .setNotification(Notification.builder().setTitle(title).setBody(message).build())
            .build();

        String response = FirebaseMessaging.getInstance().send(msg);
        System.out.println("Successfully sent message: " + response);
    }

    public void sendPushNotificationToAllDevices(String title, String message) throws FirebaseMessagingException {
        Message msg = Message.builder()
            .setNotification(Notification.builder().setTitle(title).setBody(message).build())
            .setTopic("allDevices")
            .build();

        String response = FirebaseMessaging.getInstance().send(msg);
        System.out.println("Successfully sent message: " + response);
    }

    public void sendPushNotificationToGroup(String title, String message, String group) throws FirebaseMessagingException {
        Message msg = Message.builder()
            .setNotification(Notification.builder().setTitle(title).setBody(message).build())
            .setTopic(group)
            .build();

        String response = FirebaseMessaging.getInstance().send(msg);
        System.out.println("Successfully sent message: " + response);
    }
}