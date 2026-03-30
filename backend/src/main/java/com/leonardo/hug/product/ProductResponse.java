package com.leonardo.hug.product;

import com.leonardo.hug.category.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse {

    private Long     id;
    private String   name;
    private String   description;
    private Double   price;
    private Category category;
    private Double   discount;
    private String   image_url;
    private String   link;
    private Double   finalPrice;
}
