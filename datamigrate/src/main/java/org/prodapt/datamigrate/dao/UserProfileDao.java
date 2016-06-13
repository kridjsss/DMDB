package org.prodapt.datamigrate.dao;

import java.util.List;

import org.prodapt.datamigrate.model.UserProfile;

public interface UserProfileDao {
	
	List<UserProfile> findAll();

	UserProfile findByType(String type);
	
	UserProfile findById(int id);
}
