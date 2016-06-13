package org.prodapt.datamigrate.service;

import java.util.List;

import org.prodapt.datamigrate.model.UserProfile;

public interface UserProfileService {
	
	UserProfile findById(int id);

	UserProfile findByType(String type);

	List<UserProfile> findAll();

}
