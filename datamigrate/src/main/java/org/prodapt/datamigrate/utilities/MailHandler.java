package org.prodapt.datamigrate.utilities;

import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;

public class MailHandler {
	private MailSender mailSender;

	public void setMailSender(MailSender mailSender) {
		this.mailSender = mailSender;
	}

	public void sendExceptionMail(String subject, String msg) {
		SimpleMailMessage message = new SimpleMailMessage();

		message.setFrom("krishna.reddy3346@gmail.com");
		message.setTo("krishnareddy.v@prodapt.com");
		message.setSubject(subject);
		message.setText(msg);
		mailSender.send(message);

	}
}
