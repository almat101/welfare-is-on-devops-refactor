package com.leonardo.hug.interaction;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public record InteractionRequest(
    long productId,
    @Enumerated(EnumType.STRING)
    InteractionType interactionType,
    double duration
) {
    
}
