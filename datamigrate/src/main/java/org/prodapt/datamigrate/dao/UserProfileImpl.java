package org.prodapt.datamigrate.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.prodapt.datamigrate.model.UserProfile;

public class UserProfileImpl extends AbstractDao<Integer, UserProfile> implements UserProfileDao{

	public UserProfileImpl(Class<UserProfile> persistentClass) {
		super(persistentClass);
		// TODO Auto-generated constructor stub
	}

	public List<UserProfile> findAll() {
		Criteria crit = createEntityCriteria();
		crit.addOrder(Order.asc("type"));
		return (List<UserProfile>)crit.list();
	}

	public UserProfile findByType(String type) {
		Criteria criteria = createEntityCriteria();
		criteria.add(Restrictions.eq("type", type));
		return (UserProfile)criteria.uniqueResult();
	}

	public UserProfile findById(int id) {
		return getByKey(id);
	}

}
