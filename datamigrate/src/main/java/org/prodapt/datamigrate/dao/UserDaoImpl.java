package org.prodapt.datamigrate.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.prodapt.datamigrate.model.User;

public class UserDaoImpl extends AbstractDao<Integer, User> implements UserDao{

	public UserDaoImpl(Class<User> persistentClass) {
		super(persistentClass);
		// TODO Auto-generated constructor stub
	}

	public User findById(int id) {
		return getByKey(id);
	}

	public User findBySSO(String sso) {
		Criteria crit = createEntityCriteria();
		crit.add(Restrictions.eq("ssoId", sso));
		User user = (User) crit.uniqueResult();
		return user;
	}

	public void save(User user) {
		persist(user);
	}

	public void deleteBySSO(String sso) {
		Criteria crit = createEntityCriteria();
		crit.add(Restrictions.eq("ssoId", sso));
		User user = (User) crit.uniqueResult();
		delete(user);
	}

	public List<User> findAllUsers() {
		Criteria criteria  = createEntityCriteria();
		criteria.addOrder(Order.asc("firstName"));
		criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		List<User> users = (List<User>)criteria.list();
		return users;
	}

}
