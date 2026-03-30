package com.leonardo.hug.product;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.leonardo.hug.interaction.InteractionService;
import org.springframework.security.core.Authentication;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
@Tag(name = "Product")
public class ProductController {
    
    private final ProductService service;
    private final InteractionService interactionService;

    @GetMapping("{product-id}")
    public ResponseEntity<ProductResponse> getProduct(@PathVariable("product-id") Long productId, Authentication connectedUser){
        interactionService.trackClick(productId, connectedUser);
        return ResponseEntity.ok(service.findById(productId));
    }

    @GetMapping("{category}/new")
    public ResponseEntity<Page<ProductResponse>> getNewArrival(
                @PathVariable("category") String category,
                @RequestParam(value = "page", defaultValue = "0") int page,
                @RequestParam(value = "size", defaultValue = "10") int size,
                Authentication connectedUser
    ) {
        category = category.toUpperCase();
        return ResponseEntity.ok(service.findNewArrival(category, page, size));
    }

    @GetMapping("{category}/discount")
    public ResponseEntity<Page<ProductResponse>> getDiscount(
                @PathVariable("category") String category,
                @RequestParam(value = "page", defaultValue = "0") int page,
                @RequestParam(value = "size", defaultValue = "10") int size,
                Authentication connectedUser
    ) {
        category = category.toUpperCase();
        return ResponseEntity.ok(service.findDiscount(category, page, size));
    }

    @GetMapping("{category}/top-selling")
    public ResponseEntity<Page<ProductResponse>> getTopSelling(
                @PathVariable("category") String category,
                @RequestParam(value = "page", defaultValue = "0") int page,
                @RequestParam(value = "size", defaultValue = "10") int size,
                Authentication connectedUser
    ) {
        category = category.toUpperCase();
        return ResponseEntity.ok(service.findTopSelling(category, page, size));
    }

    @GetMapping("related-product")
    public ResponseEntity<Page<ProductResponse>> getRelatedProduct(
                @RequestParam("product-id") Long productId,
                @RequestParam(value = "page", defaultValue = "0") int page,
                @RequestParam(value = "size", defaultValue = "10") int size,
                Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findRelatedProduct(productId, page, size));
    }

    @GetMapping("{category}/random")
    public ResponseEntity<Page<ProductResponse>> getRandomProduct(
                @PathVariable("category") String category,
                @RequestParam(value = "page", defaultValue = "0") int page,
                @RequestParam(value = "size", defaultValue = "10") int size,
                Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findRandomProduct(page, size, category));
    }

    @GetMapping("{category}/popular")
    public ResponseEntity<Page<ProductResponse>> getPopular(
                @PathVariable("category") String category,
                @RequestParam(value = "page", defaultValue = "0") int page,
                @RequestParam(value = "size", defaultValue = "10") int size,
                Authentication connectedUser
    ) {
        category = category.toUpperCase();
        return ResponseEntity.ok(service.findRecommendedProduct(category, page, size));
    }

}
