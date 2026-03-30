package com.leonardo.hug.auth;


import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.leonardo.hug.security.JwtService;
import com.leonardo.hug.user.User;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.util.HashMap;

@Component
@RequiredArgsConstructor
public class CustomOAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final OAuth2Service userService;
    private final JwtService jwtService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        User user = userService.processOAuthPostLogin(oAuth2User);

        var claims = new HashMap<String, Object>();
        claims.put("fullName", user.getFullName());

        var jwtToken = jwtService.generateToken(claims, user);
        
        // AuthenticationResponse res = AuthenticationResponse.builder()
        //         .token(jwtToken)
        //         .build();

        response.sendRedirect("https://localhost:443/token-capture?token=" + jwtToken);
    }
}