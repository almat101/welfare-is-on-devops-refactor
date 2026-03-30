package com.leonardo.hug.category;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Tag(name = "Category")
public class CategoryController {
    
    private final CategoryService categoryService;

    @GetMapping("allcategories")
    public List<CategoryResponse> getCategories() {
        return categoryService.getCategories();
    }

    @GetMapping("categoriesbypillar")
    public List<CategoryResponse> getCategoriesByPillar(@RequestParam String pillar) {
        Pillar pillarEnum = Pillar.valueOf(pillar.toUpperCase());
        return categoryService.getCategoriesByPillar(pillarEnum);
    }

}
