package com.leonardo.hug.sale;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.leonardo.hug.product.Product;
import com.leonardo.hug.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;
    
    @ManyToOne
    @NotNull
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @NotNull
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    String saleId;

    @Column(nullable = false)
    double price;

    @Column(nullable = false)
    @Positive(message = "La quantità deve essere positiva")
    private int quantity;

}
