package com.leonardo.hug.sale;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.leonardo.hug.interaction.InteractionService;

import org.springframework.security.core.Authentication;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Tag(name = "Sale")
public class SaleController {

    private final SaleService service;
    private final InteractionService interactionService;
    
    @PostMapping("sale")
    public ResponseEntity<SaleResponse> registerSale(@Valid @RequestBody SaleRequest saleRequest, Authentication connectedUser) {
        
        String saleId = service.saveSaleToDatabase(saleRequest, connectedUser);
        SaleResponse response = new SaleResponse(saleId, "Sale registered successfully");
        
        interactionService.trackSale(saleRequest.productId(), connectedUser);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

}
