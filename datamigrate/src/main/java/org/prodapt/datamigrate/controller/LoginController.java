package org.prodapt.datamigrate.controller;

import java.io.StringWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.prodapt.datamigrate.utilities.MailHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class LoginController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	@Autowired
	MailHandler sendMailBean;
	@Autowired
	VelocityEngine velocityEngine;
	
	@RequestMapping(value = { "/", "/home" }, method = RequestMethod.GET)
	public String homePage(ModelMap model) {
		model.addAttribute("greeting", "Hi, Welcome to mysite. ");
		VelocityContext context = new VelocityContext();
		context.put("userName", getPrincipal());
		Template template = velocityEngine.getTemplate("templates/hello.vm");
		StringWriter writer = new StringWriter();
		template.merge(context, writer);
//		System.out.println("template content:"+writer);
		sendMailBean.sendExceptionMail("Welcome to Login",writer.toString());
		return "home";
	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String loginPage() {
		return "login";
	}

	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logoutPage(HttpServletRequest request,
			HttpServletResponse response) {
		try {
			Authentication auth = SecurityContextHolder.getContext()
					.getAuthentication();
			if (auth != null) {
				new SecurityContextLogoutHandler().logout(request, response,
						auth);
			}
		} catch (Exception e) {
			VelocityContext context = new VelocityContext();
			context.put("userName", "krishna");
			Template template = velocityEngine.getTemplate("templates/hello.vm");
			StringWriter writer = new StringWriter();
			template.merge(context, writer);
			sendMailBean.sendExceptionMail(writer.toString(),e.getMessage());
		}
		return "redirect:/login?logout";
	}

	@RequestMapping(value = "/Access_Denied", method = RequestMethod.GET)
	public String accessDeniedPage(ModelMap model) {
		model.addAttribute("user", getPrincipal());
		return "accessDenied";
	}

	private String getPrincipal() {
		String userName = null;
		Object principal = SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();

		if (principal instanceof UserDetails) {
			userName = ((UserDetails) principal).getUsername();
		} else {
			userName = principal.toString();
		}
		return userName;
	}
}
