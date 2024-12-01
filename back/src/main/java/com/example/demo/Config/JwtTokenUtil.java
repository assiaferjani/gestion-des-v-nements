package com.example.demo.Config;

import org.springframework.stereotype.Component;

import java.util.Base64;


@Component
public class JwtTokenUtil {

	 public static String generateToken(String email) {
	        String payload = email + ":" + System.currentTimeMillis();
	        return Base64.getEncoder().encodeToString(payload.getBytes());
	    }

	    public static String decodeToken(String token) {
	        byte[] decodedBytes = Base64.getDecoder().decode(token);
	        return new String(decodedBytes);
	    }
}