package com.leonardo.hug.gym;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface GymRepository extends JpaRepository<Gym, Long> {

    @Query(value = "SELECT g FROM Gym g ORDER BY " +
           "(6371 * acos(cos(radians(:latitude)) * cos(radians(g.latitude)) * cos(radians(g.longitude) - radians(:longitude)) + sin(radians(:latitude)) * sin(radians(g.latitude))))")
    List<Gym> findAllByDistanceOrderByDistance(@Param("latitude") double latitude, @Param("longitude") double longitude);

}
