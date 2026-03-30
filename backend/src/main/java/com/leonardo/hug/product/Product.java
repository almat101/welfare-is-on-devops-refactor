package com.leonardo.hug.product;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.leonardo.hug.sale.Sale;
import com.leonardo.hug.category.Category;
import com.leonardo.hug.interaction.Interaction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
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
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Il nome del prodotto non può essere nullo o vuoto")
    @Column(nullable = false)
    private String name;
    private String description;
    @NotNull(message = "Il prezzo del prodotto non può essere nullo")
    @Positive(message = "Il prezzo del prodotto deve essere positivo")
    @Column(nullable = false) 
    private Double price;
    @Enumerated(EnumType.STRING)
    private Category category;
    @Builder.Default
    @Positive(message = "Il sconto del prodotto deve essere positivo")
    private Double discount = 0.0;
    @Builder.Default
    private String image_url = "";
    @Builder.Default
    private String link = "";

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<Sale> sales;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<Interaction> interactions;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    public double getFinalPrice() {
        double finalprice = price - (price * (discount / 100));
        return Math.round(finalprice * 100.0) / 100.0;
    }

    public double saved() {
        double saved = price - getFinalPrice();
        return Math.round(saved * 100.0) / 100.0;
    }

}