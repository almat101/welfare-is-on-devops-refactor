package com.leonardo.hug.interaction;

import org.springframework.stereotype.Service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import com.leonardo.hug.user.User;
import com.leonardo.hug.product.Product;
import com.leonardo.hug.product.ProductMapper;
import com.leonardo.hug.product.ProductRepository;
import com.leonardo.hug.product.ProductResponse;

@Service
@RequiredArgsConstructor
public class InteractionService {

    private final ProductRepository productRepository;
    private final InteractionRepository interactionRepository;
    private final ProductMapper productMapper;
    
    public void save(@Valid InteractionRequest interactionRequest, Authentication connectedUser){
        
        User user = ((User) connectedUser.getPrincipal());
        Product product = productRepository.findById(interactionRequest.productId())
            .orElseThrow(() -> new EntityNotFoundException("Prodotto non trovato con id: " + interactionRequest.productId()));

        Interaction interaction = Interaction.builder()
            .user(user)
            .product(product)
            .type(interactionRequest.interactionType())
            .build();

        interactionRepository.save(interaction);
    }

    public int like(long productId, Authentication connectedUser) {
        int likes = 0;
        User user = ((User) connectedUser.getPrincipal());
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new EntityNotFoundException("Prodotto non trovato con id: " + productId));
        Optional<Interaction> interaction = interactionRepository.findByUserAndProductAndType(user, product, InteractionType.LIKE);

        if (interaction.isPresent()) {
            likes = 0;
            interactionRepository.delete(interaction.get());
        } else {
            Interaction like = Interaction.builder()
                                .user(user)
                                .product(product)
                                .type(InteractionType.LIKE)
                                .build();
                                interactionRepository.save(like);
                                likes = 1;
        }
        return likes;
    }

    public Page<ProductResponse> getFavorites(Authentication connectedUser, int page, int size) {
        User user = (User) connectedUser.getPrincipal();
        PageRequest pageable = PageRequest.of(page, size);

        Page<Product> productPage = interactionRepository.findByUserAndType(user, InteractionType.LIKE, pageable);

        if (productPage.isEmpty()) {
            System.out.println("No favorite products found for user: " + user.getUsername());
        }

        return productPage.map(productMapper::toProductResponse);
    }

    public void trackClick(Long productId, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new EntityNotFoundException("Product not found"));
        Optional<Interaction> interaction = interactionRepository.findByUserAndProductAndType(user, product, InteractionType.CLICK);
        if (interaction.isPresent()) {
            Interaction existingInteraction = interaction.get();
            existingInteraction.setDuration(existingInteraction.getDuration() + 1);
            interactionRepository.save(existingInteraction);
        }
        else {
            Interaction newInteraction = Interaction.builder()
                .user(user)
                .product(product)
                .type(InteractionType.CLICK)
                .build();
            interactionRepository.save(newInteraction);
        }
    }

    public void trackView(Authentication connectedUser, Page<ProductResponse> productsPage) {
        User user = ((User) connectedUser.getPrincipal());
        productsPage.forEach(productResponse -> {
            Product product = productRepository.findById(productResponse.getId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
            Interaction interaction = Interaction.builder()
                .user(user)
                .product(product)
                .type(InteractionType.VIEW)
                .build();
            interactionRepository.save(interaction);
        });
    }

    public void trackSale(long productId, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new EntityNotFoundException("Product not found"));
        Interaction interaction = Interaction.builder()
            .user(user)
            .product(product)
            .type(InteractionType.SALE)
            .build();
        interactionRepository.save(interaction);
    }
}
