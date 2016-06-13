package org.prodapt.datamigrate.model;

import java.io.Serializable;

public enum UserProfileType implements Serializable {
	USER("USER"), ADMIN("ADMIN"), DBA("DBA");

	String userProfileType;

	private UserProfileType(String userProfileType) {
		this.userProfileType = userProfileType;
	}

	public String getUserProfileType() {
		return userProfileType;
	}

}
