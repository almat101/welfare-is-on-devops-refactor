package com.leonardo.hug.category;

import lombok.Getter;

@Getter
public enum Category {
    // Pillar: ECONOMIC
    ELETTRONICA("Prodotti elettronici come computer e telefoni", "https://cdn.pixabay.com/photo/2021/11/16/15/35/technology-6801334_960_720.jpg", 1, Pillar.ECONOMIC, "Elettronica"),
    FINANZE("Servizi finanziari e bancari", "https://cdn.pixabay.com/photo/2014/07/06/13/55/calculator-385506_960_720.jpg", 2, Pillar.ECONOMIC, "Finanze"),
    INVESTIMENTI("Opzioni di investimento e trading", "https://cdn.pixabay.com/photo/2017/08/10/01/42/stock-market-2616931_960_720.jpg", 3, Pillar.ECONOMIC, "Investimenti"),
    SERVIZI("Servizi di consulenza e supporto", "https://cdn.pixabay.com/photo/2018/03/27/21/43/startup-3267505_960_720.jpg", 8, Pillar.ECONOMIC, "Servizi"),

    // Pillar: PHYSICAL
    SPORT("Attrezzature sportive e abbigliamento", "https://cdn.pixabay.com/photo/2023/08/27/00/08/cycling-8215968_960_720.jpg", 12, Pillar.PHYSICAL, "Sport"),
    FITNESS("Servizi e prodotti per il fitness", "https://cdn.pixabay.com/photo/2017/04/22/10/15/woman-2250970_960_720.jpg", 13, Pillar.PHYSICAL, "Fitness"),
    SALUTE("Prodotti e servizi per la salute", "https://cdn.pixabay.com/photo/2024/06/17/10/16/doctors-8835368_960_720.jpg", 14, Pillar.PHYSICAL, "Salute"),

    // Pillar: PSYCHOLOGICAL
    MOTIVAZIONE("Libri e strumenti di auto-motivazione", "https://cdn.pixabay.com/photo/2019/04/29/14/32/make-the-day-great-4166221_960_720.jpg", 27, Pillar.PSYCHOLOGICAL, "Motivazione"),
    SVILUPPO_PERSONALE("Materiali per lo sviluppo personale", "https://cdn.pixabay.com/photo/2016/11/19/11/11/hands-1838659_960_720.jpg", 28, Pillar.PSYCHOLOGICAL, "Sviluppo Personale"),
    BENESSERE_MENTALE("Prodotti per il benessere mentale", "https://cdn.pixabay.com/photo/2020/11/03/15/31/doctor-5710152_960_720.jpg", 29, Pillar.PSYCHOLOGICAL, "Benessere Mentale"),

    // Pillar: FAMILY
    EDUCAZIONE("Servizi di educazione e apprendimento", "https://cdn.pixabay.com/photo/2016/06/01/06/26/open-book-1428428_960_720.jpg", 33, Pillar.FAMILY, "Educazione"),
    PARENTALCARE("Prodotti e servizi per la famiglia", "https://cdn.pixabay.com/photo/2017/12/27/19/13/family-3043408_960_720.jpg", 34, Pillar.FAMILY, "Famiglia"),
    VACANZE("Servizi e offerte per le vacanze familiari", "https://cdn.pixabay.com/photo/2018/06/27/17/48/fantasy-3502188_960_720.jpg", 35, Pillar.FAMILY, "Vacanze");


    private final Pillar pillar;
    private final String description;
    private final String cover;
    private final int id;
    private final String name;

    Category(String description, String cover, int id, Pillar pillar, String name) {
        this.description = description;
        this.cover = cover;
        this.id = id;
        this.pillar = pillar;
        this.name = name;
    }
}
