package com.leonardo.hug.auth;

import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.leonardo.hug.role.RoleRepository;
import com.leonardo.hug.user.User;
import com.leonardo.hug.user.UserRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OAuth2Service {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public User processOAuthPostLogin(OAuth2User oauthUser) {
        String username = oauthUser.getAttribute("email");
        String oAuth2UserId = oauthUser.getAttribute("sub");
        String provider = "Google";
        String firstName = oauthUser.getAttribute("given_name");
        String lastName = oauthUser.getAttribute("family_name");
        
        var userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new IllegalStateException("ROLE_USER non inizializzato"));

        Optional<User> userOpt = userRepository.findByoAuth2UserId(oAuth2UserId);

        User user;
        if (userOpt.isPresent()) {
            user = userOpt.get();
        } else {
            user = userRepository.findByEmail(username).orElse(null);
            if (user == null) {
                user = new User();
                user.setEmail(username);
                user.setOAuth2UserId(oAuth2UserId);
                user.setOAuth2Provider(provider);
                user.setFirstname(firstName);
                user.setLastname(lastName);
                user.setEnabled(true);
                user.setRoles(List.of(userRole));
                userRepository.save(user);
            }
        }
        return user;
    }
}
