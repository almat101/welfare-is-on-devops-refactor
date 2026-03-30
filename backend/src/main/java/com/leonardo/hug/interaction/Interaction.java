package com.leonardo.hug.interaction;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.leonardo.hug.product.Product;
import com.leonardo.hug.user.User;

import io.swagger.v3.oas.annotations.tags.Tag;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@Tag(name = "Interaction")
public class Interaction {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_interazione;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InteractionType type;

    @Column(nullable = false)
    @Builder.Default
    private double duration = 1;

    @ManyToOne
    @NotNull(message = "User cannot be null")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @NotNull(message = "Product cannot be null")
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;

}