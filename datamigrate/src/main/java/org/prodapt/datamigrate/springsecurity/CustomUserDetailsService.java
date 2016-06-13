package org.prodapt.datamigrate.springsecurity;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service("customUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

	public UserDetails loadUserByUsername(String ssoId)
			throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		return null;
	}

}
