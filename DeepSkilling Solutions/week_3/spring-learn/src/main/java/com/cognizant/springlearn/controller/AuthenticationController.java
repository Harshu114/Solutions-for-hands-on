package com.cognizant.springlearn.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Base64;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
public class AuthenticationController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationController.class);
    private static final String SECRET_KEY = "secretkey";

    @GetMapping("/authenticate")
    public Map<String, String> authenticate(@RequestHeader("Authorization") String authHeader) {
        LOGGER.info("START authenticate()");
        LOGGER.debug("Authorization header: {}", authHeader);

        String user = getUser(authHeader);
        String token = generateJwt(user);

        Map<String, String> map = new HashMap<>();
        map.put("token", token);

        LOGGER.info("END authenticate()");
        return map;
    }

    private String getUser(String authHeader) {
        LOGGER.info("START getUser()");
        // Extract the Base64 encoded credentials after "Basic "
        String base64Credentials = authHeader.substring(6); // Length of "Basic " is 6
        byte[] credDecoded = Base64.getDecoder().decode(base64Credentials);
        String credentials = new String(credDecoded);
        // Format is username:password
        String[] parts = credentials.split(":");
        String username = parts[0];
        LOGGER.info("END getUser()");
        return username;
    }

    private String generateJwt(String user) {
        LOGGER.info("START generateJwt()");
        // Create JWT token
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        // In the exercise, they set expiration 20 minutes from now
        long expMillis = nowMillis + 1200000; // 20 minutes
        Date expDate = new Date(expMillis);

        String token = Jwts.builder()
                .setSubject(user)
                .setIssuedAt(now)
                .setExpiration(expDate)
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
        LOGGER.info("END generateJwt()");
        return token;
    }
}
