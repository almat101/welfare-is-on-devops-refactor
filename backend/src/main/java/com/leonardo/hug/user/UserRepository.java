package com.leonardo.hug.user;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface UserRepository extends JpaRepository<User, Integer>{

    Optional<User> findByEmail(String email);
    Optional<User> findByoAuth2UserId(String oAuth2UserId);
    boolean existsByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.isCoach = true")
    Page<User> findAllByIsCoach(Pageable pageable);
}
