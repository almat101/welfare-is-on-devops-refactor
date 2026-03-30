package com.leonardo.hug.personal_data;

import org.springframework.stereotype.Service;


@Service
public class PersonalDataMapper {

	public PersonalData toPersonalData(PersonalDataRequest personalData) {
		return PersonalData.builder()
				.gender(personalData.gender())
				.married(personalData.married())
				.children(personalData.children())
				.birthdate(personalData.birthdate())
				.elderlyParents(personalData.elderlyParents())
				.mobileNumber(personalData.mobileNumber())
				.sede(personalData.sede())
				.reparto(personalData.reparto())
				.build();
	}

	public PersonalDataResponse toPersonalDataResponse(PersonalData personalData) {
		return PersonalDataResponse.builder()
				.birthdate(personalData.getBirthdate())
				.children(personalData.isChildren())
				.elderlyParents(personalData.isElderlyParents())
				.married(personalData.isMarried())
				.mobileNumber(personalData.getMobileNumber())
				.gender(personalData.getGender())
				.sede(personalData.getSede())
				.reparto(personalData.getReparto())
				.build();
	}

}
