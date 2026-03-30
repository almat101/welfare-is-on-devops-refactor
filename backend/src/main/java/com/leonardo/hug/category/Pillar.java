package com.leonardo.hug.category;

import lombok.Getter;

@Getter
public enum Pillar {
    PHYSICAL(1, "Physical Well-being", "", "descrizione"),
    ECONOMIC(2, "Economic Well-being", "", "descrizione"),
    PSYCHOLOGICAL(3, "Psychological Well-being", "", "descrizione"),
    FAMILY(4, "Family Well-being", "", "descrizione");

    
    private final int id;
    private final String name;
    private final String description;
    private final String cover;

    Pillar(int id, String name, String cover, String description) {
        this.id = id;
        this.name = name;
        this.cover = cover;
        this.description = description;
    }
}