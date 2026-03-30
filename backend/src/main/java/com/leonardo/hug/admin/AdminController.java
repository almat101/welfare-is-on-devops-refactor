package com.leonardo.hug.admin;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.leonardo.hug.user.User;
import com.leonardo.hug.user.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("admin")
@Tag(name = "Admin")
public class AdminController {

    private final UserService userService;
    
    public AdminController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping("allusers")     
    public ResponseEntity<Page<User>> getUsers(
                @RequestParam(value = "page", defaultValue = "0") int page,
                @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(userService.getAllUsers(page, size));
    }

    @GetMapping("setCoach")
    public ResponseEntity<Void> setCoach(@RequestParam int userId, @RequestParam boolean isCoach) {
        userService.setCoach(userId, isCoach);
        return ResponseEntity.ok().build();
    }

}