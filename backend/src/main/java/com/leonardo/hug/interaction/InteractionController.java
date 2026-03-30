package com.leonardo.hug.interaction;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.leonardo.hug.product.ProductResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/interaction")
@RequiredArgsConstructor
@Tag(name = "Interaction")
public class InteractionController {
    
    public final InteractionService service;

    @PostMapping
    public void saveInteraction(@Valid @RequestBody InteractionRequest interactionRequest, Authentication connectedUser){
        service.save(interactionRequest, connectedUser);
    }

    @PostMapping("favorite")
    public ResponseEntity<Integer> like(@RequestParam long productId, Authentication connectedUser){
        int like = service.like(productId, connectedUser);
        return ResponseEntity.ok(like);
    }

     @GetMapping("myfavorites")
    public ResponseEntity<Page<ProductResponse>> getFavorites(
                    Authentication connectedUser,
                    @RequestParam(value = "page", defaultValue = "0") int page,
                    @RequestParam(value = "size", defaultValue = "10") int size) {
        Page<ProductResponse> favoritesPage = service.getFavorites(connectedUser, page, size);

        if (favoritesPage.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(favoritesPage);
    }
}
