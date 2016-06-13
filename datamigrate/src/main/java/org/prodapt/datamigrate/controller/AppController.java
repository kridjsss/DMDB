package org.prodapt.datamigrate.controller;

import java.util.List;
import java.util.Locale;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.prodapt.datamigrate.model.User;
import org.prodapt.datamigrate.service.UserService;
import org.prodapt.datamigrate.service.UserProfileService;


@Controller
public class AppController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	UserProfileService userProfileService;
	
	@Autowired
	MessageSource messageSource;

	@RequestMapping(value = {"/","/list"}, method = RequestMethod.GET)
	public String listUsers(ModelMap model){
		List<User> users = userService.findAllUsers();
		model.addAttribute("users", users);
		model.addAttribute("loggedInUser", getPrincipal());
		return "userslist";
	}

	@RequestMapping(value = "/newuser", method = RequestMethod.GET)
	public String newUser(ModelMap model){
		User user = new User();
		model.addAttribute("user",user);
		model.addAttribute("edit", false);
		model.addAttribute("loggedInUser", getPrincipal());
		return "registration";
	}
	
	@RequestMapping(value = "/newuser", method = RequestMethod.POST)
	public String saveUser(@Valid User user, BindingResult result, ModelMap model){
		if(result.hasErrors())
			return "registration";
		
		if(!userService.isUserSSOUnique(user.getId(),user.getSsoId())){
			FieldError ssoError = new FieldError("user","ssoId",messageSource.getMessage("non.unique.ssoId", new String[]{user.getSsoId()}, Locale.getDefault() ));
			result.addError(ssoError);
			return "registration";
		}
		
		userService.saveUser(user);
		model.addAttribute("success", "User "+ user.getFirstName() + " " + user.getLastName() + "registered successfully");
		model.addAttribute("loggedInUser", getPrincipal());
		return "registrationSuccess";
		
	}
	
    private String getPrincipal(){
        String userName = null;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
 
        if (principal instanceof UserDetails) {
            userName = ((UserDetails)principal).getUsername();
        } else {
            userName = principal.toString();
        }
        return userName;
    }
}
