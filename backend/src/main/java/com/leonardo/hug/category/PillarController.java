package com.leonardo.hug.category;

import static com.leonardo.hug.category.Pillar.*;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "Pillar")
public class PillarController {
    
    @GetMapping("/pillar")
    public ResponseEntity<List<PillarResponse>> getPillar(){
        return ResponseEntity.ok(List.of(
            PillarResponse.builder().id(PHYSICAL.getId()).name(PHYSICAL.getName()).description(PHYSICAL.getDescription()).image(PHYSICAL.getCover()).build(),
            PillarResponse.builder().id(ECONOMIC.getId()).name(ECONOMIC.getName()).description(ECONOMIC.getDescription()).image(ECONOMIC.getCover()).build(),
            PillarResponse.builder().id(PSYCHOLOGICAL.getId()).name(PSYCHOLOGICAL.getName()).description(PSYCHOLOGICAL.getDescription()).image(PSYCHOLOGICAL.getCover()).build(),
            PillarResponse.builder().id(FAMILY.getId()).name(FAMILY.getName()).description(FAMILY.getDescription()).image(FAMILY.getCover()).build()
        ));
    }
}
