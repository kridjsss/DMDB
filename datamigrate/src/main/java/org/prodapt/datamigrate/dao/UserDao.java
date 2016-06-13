package org.prodapt.datamigrate.dao;

import java.util.List;

import org.prodapt.datamigrate.model.User;

public interface UserDao {

	User findById(int id);

	User findBySSO(String sso);

	void save(User user);

	void deleteBySSO(String sso);

	List<User> findAllUsers();
}
