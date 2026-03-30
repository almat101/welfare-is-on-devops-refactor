package com.leonardo.hug.sale;

public record SaleRequest (
        long productId,
        int quantity
    ) {
}
