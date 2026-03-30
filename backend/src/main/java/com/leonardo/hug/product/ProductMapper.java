package com.leonardo.hug.product;

import org.springframework.stereotype.Service;

@Service
public class ProductMapper {

    public ProductResponse toProductResponse(Product product) {
        return ProductResponse.builder()
                    .id(product.getId())
                    .name(product.getName())
                    .description(product.getDescription())
                    .price(product.getPrice())
                    .category(product.getCategory())
                    .discount(product.getDiscount())
                    .image_url(product.getImage_url())
                    .finalPrice(product.getFinalPrice())
                    .link(product.getLink())
                    .build();
    }
    
}
