package com.leonardo.hug.sale;

import java.util.UUID;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.leonardo.hug.user.User;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import com.leonardo.hug.product.Product;
import com.leonardo.hug.product.ProductRepository;
import com.leonardo.hug.user.UserRepository;

@Service
@RequiredArgsConstructor
public class SaleService {

    private final ProductRepository productRepository;
    private final SaleRepository saleRepository;
	private final UserRepository userRepository;

    public String saveSaleToDatabase(SaleRequest saleRequest, Authentication connectedUser) {

        User user = ((User) connectedUser.getPrincipal());

        Product product = productRepository.findById(saleRequest.productId())
                .orElseThrow(() -> new EntityNotFoundException("Prodotto non trovato con id: " + saleRequest.productId()));

        String saleId = generateSaleId();

        user.addSaved(product.saved());
		userRepository.save(user);

        Sale sale = Sale.builder()
                .user(user)
                .product(product)
                .saleId(saleId)
                .price(product.getFinalPrice()*saleRequest.quantity())
                .quantity(saleRequest.quantity())
                .build();

        saleRepository.save(sale);

        return saleId;
    }

    private String generateSaleId() {
        return UUID.randomUUID().toString();
    }

}
