package org.prodapt.datamigrate.service;

import java.util.List;

import org.prodapt.datamigrate.dao.UserProfileDao;
import org.prodapt.datamigrate.model.UserProfile;
import org.springframework.beans.factory.annotation.Autowired;

public class UserProfileServiceImpl implements UserProfileService{

	@Autowired
	UserProfileDao dao;
	
	public UserProfile findById(int id) {
		return dao.findById(id);
	}

	public UserProfile findByType(String type) {
		return dao.findByType(type);
	}

	public List<UserProfile> findAll() {
		return dao.findAll();
	}

}
