package com.leonardo.hug.personal_data;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import com.leonardo.hug.user.User;
import com.leonardo.hug.user.UserRepository;

@Service
@RequiredArgsConstructor
public class PersonalDataService {

    private final UserRepository userRepository;
    private final PersonalDataMapper personalDataMapper;

    public Integer save(@Valid PersonalDataRequest personalData, Authentication connectedUser ) {
        User user = ((User) connectedUser.getPrincipal());
        PersonalData data = personalDataMapper.toPersonalData(personalData);
        user.setPersonalData(data);
        return userRepository.save(user).getId();
    }

    public PersonalDataResponse findById(Authentication connectedUser) {
        
        User user = ((User) connectedUser.getPrincipal());
        return personalDataMapper.toPersonalDataResponse(user.getPersonalData());
    }

}
