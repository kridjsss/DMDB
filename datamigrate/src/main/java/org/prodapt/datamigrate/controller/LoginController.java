package org.prodapt.datamigrate.controller;

import javax.servlet.http.HttpServlet;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class LoginController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@RequestMapping(value="/login",method = RequestMethod.GET)
	public String loginPage() {
		return "login";
	}
	@RequestMapping(value="/authenticate",method = RequestMethod.POST)
	public String authenticate(){
		return "home";
	}
	@RequestMapping(value="/logout",method = RequestMethod.GET)
	public String logout(){
		return "login";
	}
}
