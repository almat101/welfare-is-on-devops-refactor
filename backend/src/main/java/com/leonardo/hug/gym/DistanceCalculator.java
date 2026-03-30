package com.leonardo.hug.gym;

public class DistanceCalculator {

    private static final double EARTH_RADIUS_KM = 6371.0;

    public static double calculateDistance(double userLat, double userLon, double gymLat, double gymLon) {
        double dLat = Math.toRadians(gymLat - userLat);
        double dLon = Math.toRadians(gymLon - userLon);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                   Math.cos(Math.toRadians(userLat)) * Math.cos(Math.toRadians(gymLat)) *
                   Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS_KM * c;
    }
}