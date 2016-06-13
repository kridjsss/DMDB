package org.prodapt.datamigrate.service;

import java.util.List;

import org.prodapt.datamigrate.dao.UserDao;
import org.prodapt.datamigrate.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService{

	@Autowired
	UserDao userDao;
	@Autowired
	PasswordEncoder passwordEncoder;
	
	public User findById(int id) {
		return userDao.findById(id);
	}

	public User findBySSO(String sso) {
		return userDao.findBySSO(sso);
	}

	public void saveUser(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userDao.save(user);
	}

	public void updateUser(User user) {
		User entity = userDao.findById(user.getId());
		if(entity != null){
			entity.setSsoId(user.getSsoId());
			if(!user.getPassword().equals(entity.getPassword()))
				entity.setPassword(passwordEncoder.encode(user.getPassword()));
			entity.setLastName(user.getLastName());
			entity.setFirstName(user.getFirstName());
			entity.setEmail(user.getEmail());
			entity.setUserProfiles(user.getUserProfiles());
		}
	}

	public void deleteUserBySSO(String sso) {
		userDao.deleteBySSO(sso);
	}

	public List<User> findAllUsers() {
		return userDao.findAllUsers();
	}

	public boolean isUserSSOUnique(Integer id, String sso) {
		User user = userDao.findBySSO(sso);
		return (user == null || (id != null && (user.getId() == id)));
	}

}
