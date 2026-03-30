package com.leonardo.hug.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.leonardo.hug.auth.CustomOAuth2AuthenticationSuccessHandler;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity()
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig {

    private final AuthenticationProvider authenticationProvider;
    private final JwtFilter jwtAuthFilted;
    private final CustomOAuth2AuthenticationSuccessHandler customOAuth2AuthenticationSuccessHandler;



    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
            .cors( Customizer.withDefaults())
            .csrf( AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(req -> req
                .requestMatchers(
            "/auth/**",
            "/health",
                    "/v2/api-docs",
                    "/v3/api-docs",
                    "/v3/api-docs/**",
                    "/swagger-resources",
                    "/swagger-resources/**",
                    "/configuration/ui",
                    "/configuration/security",
                    "/swagger-ui/**",
                    "/webjars/**",
                    "/swagger-ui.html",
                    "/oauth2/**",
                    "/chat/**"
                    ).permitAll()
                .requestMatchers("/admin/**", "/notifications/**").hasRole("ADMIN")
                .anyRequest()
                .authenticated()
            )
            .oauth2Login(oauth2Login -> oauth2Login
                .loginPage("https://localhost:443/login")
                .successHandler(customOAuth2AuthenticationSuccessHandler)
                .failureUrl("https://localhost:443/login?error")
                )
             .logout(logout -> logout
                .logoutUrl("/auth/logout")
                .logoutSuccessUrl("https://localhost:443/login")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .logoutRequestMatcher(new AntPathRequestMatcher("/auth/logout", "POST"))
            )
            .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilted, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}

