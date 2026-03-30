package com.leonardo.hug.gym;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Gym {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Default
    double latitude = 0.0;
    @Default
    double longitude = 0.0;


    @Embedded
    private Address address;

    private String name;

    private String description;

    private String image_url;

    private String link;

    private String phone;


}
