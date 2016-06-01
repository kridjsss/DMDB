package org.prodapt.datamigrate.utilities;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import org.apache.log4j.Logger;

public class URLConnection {
	private static Logger logger = Logger.getLogger(URLConnection.class.getName());
	
	public static String establish(String url, String requestMethod, String json, String contentType){
		BufferedReader in = null;
		String res = null;
		
		try {
			URL obj = new URL(url);
			
			HttpURLConnection con = (HttpURLConnection) obj.openConnection();
			
			//set request method
			con.setRequestMethod(requestMethod);
			
			if("POST".equals(requestMethod)){
				con.setDoOutput(true);
				DataOutputStream wr = new DataOutputStream(con.getOutputStream());
				wr.writeBytes(json);
				wr.flush();
				wr.close();
			}
			
			//add request header
			con.setRequestProperty("Accept-Charset", "UTF-8");
			con.setRequestProperty("Content-Type", contentType);
			
			int responseCode = con.getResponseCode();
			logger.info("Response Code:"+responseCode);
			
			in = new BufferedReader(new InputStreamReader(con.getInputStream()));
			
			String inputLine;
			StringBuilder response = new StringBuilder();
			
			while((inputLine = in.readLine())!=null){
				response.append(inputLine);
			}
			in.close();
			res = response.toString();
			
			logger.info("Response:"+response);
			
		} catch (MalformedURLException e) {
			logger.error("Exception in establish URL connection",e);
		} catch (IOException e) {
			logger.error("Exception in establish URL connection",e);
		}
		return res;
	}

}
