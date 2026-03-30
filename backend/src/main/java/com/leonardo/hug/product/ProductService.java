package com.leonardo.hug.product;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.leonardo.hug.category.Category;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper     productMapper;

    //RICERCA PRODOTTO PER ID
    public ProductResponse findById(Long productId) {
        return productRepository.findById(productId)
                .map(productMapper::toProductResponse)
                .orElseThrow(() -> new EntityNotFoundException("Prodotto non trovato con id: " + productId));

    }

    //PRODOTTI NUOVI
    public Page<ProductResponse> findNewArrival(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Category cat = Category.valueOf(category.toUpperCase());
        Page<Product> productsPage = productRepository.findByCategory(cat, pageable);
        return productsPage.map(productMapper::toProductResponse);
    }

    //PRODOTTI IN SCONTO
    public Page<ProductResponse> findDiscount(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("discount").descending());
        Category cat = Category.valueOf(category.toUpperCase());
        Page<Product> productsPage = productRepository.findByCategory(cat, pageable);
        return productsPage.map(productMapper::toProductResponse);
    }

    //PRODOTTI PIU' VENDUTI
    public Page<ProductResponse> findTopSelling(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Category cat = Category.valueOf(category.toUpperCase());
        Page<Product> productsPage = productRepository.findTopSellingProductsByCategory(cat, pageable);
        return productsPage.map(productMapper::toProductResponse);
    }

    //ALTRI UTENTI HANNO ACQUISTATO ANCHE
    public Page<ProductResponse> findRelatedProduct(Long productId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productsPage = productRepository.findRelatedProductsByUserPurchases(productId, pageable);
        return productsPage.map(productMapper::toProductResponse);
    }

    //POPOLARI TRA GLI UTENTI
    public Page<ProductResponse> findRecommendedProduct(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Category cat = Category.valueOf(category.toUpperCase());
        Page<Product> productsPage = productRepository.findRecommendedProductsByLikes(cat, pageable);
        return productsPage.map(productMapper::toProductResponse);
    }

    //PRODOTTI CASUALI
    public Page<ProductResponse> findRandomProduct(int page, int size, String category) {
        Pageable pageable = PageRequest.of(page, size);
        Category cat = Category.valueOf(category.toUpperCase());
        Page<Product> productsPage = productRepository.findRandomProducts(pageable, cat);
        return productsPage.map(productMapper::toProductResponse);
    }

    //PRODOTTI NON ANCORA VISTI DALL'UTENTE
    public Page<ProductResponse> getProductsNotViewedByUser(int page, int size, int userId) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productsPage = productRepository.findProductsNotViewedByUser(userId, pageable);
        return productsPage.map(productMapper::toProductResponse);
    }

}
