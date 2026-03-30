package com.leonardo.hug.category;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {

    public List<CategoryResponse> getCategories() {
        
        List<Category> list = List.of(Category.values());
        List<CategoryResponse> categories = new ArrayList<>();

        for (Category category : list) {
            categories.add(CategoryResponse.builder()
                    .id(category.getId())
                    .name(category.getName())
                    .description(category.getDescription())
                    .cover(category.getCover())
                    .pillar(category.getPillar().name())
                    .build());
        }
        return categories;
    }

    public List<CategoryResponse> getCategoriesByPillar(@RequestParam Pillar pillar) {
        List<CategoryResponse> categoriesByPillar = new ArrayList<>();
    
        if (pillar == null) {
            throw new IllegalArgumentException("Pillar cannot be null");
        }
    
        for (Category category : Category.values()) {
            if (category.getPillar() != null && category.getPillar().equals(pillar)) {
                categoriesByPillar.add(CategoryResponse.builder()
                        .id(category.getId())
                        .name(category.getName())
                        .description(category.getDescription())
                        .cover(category.getCover())
                        .pillar(category.getPillar().name())
                        .build());
            }
        }
        return categoriesByPillar;
    }
    

}
