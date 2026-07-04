package com.cognizant.jwtlearn.controller;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
public class AuthenticationController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationController.class);

    @GetMapping("/authenticate")
    public Map<String, String> authenticate(@RequestHeader("Authorization") String authHeader) {
        LOGGER.info("START");
        LOGGER.debug("Authorization Header: {}", authHeader);

        Map<String, String> map = new HashMap<>();
        map.put("token", generateJwt(getUser(authHeader)));

        LOGGER.info("END");
        return map;
    }

    /**
     * Exercise 6b: extract the username from the "Basic <base64(user:pwd)>" header.
     */
    private String getUser(String authHeader) {
        LOGGER.debug("Start getUser()");
        // Strip the "Basic " prefix
        String encodedCredentials = authHeader.substring("Basic ".length());
        // Decode
        byte[] decodedBytes = Base64.getDecoder().decode(encodedCredentials);
        String decoded = new String(decodedBytes, StandardCharsets.UTF_8);
        LOGGER.debug("Decoded credentials: {}", decoded);
        // User is everything before the first ':'
        String user = decoded.split(":", 2)[0];
        LOGGER.debug("User: {}", user);
        LOGGER.debug("End getUser()");
        return user;
    }

    /**
     * Exercise 6c: build an HS256-signed JWT for the user, valid for 20 minutes.
     * Code matches the handson verbatim.
     */
    private String generateJwt(String user) {
        LOGGER.debug("Start generateJwt()");
        JwtBuilder builder = Jwts.builder();
        builder.setSubject(user);
        // Set the token issue time as current time
        builder.setIssuedAt(new Date());
        // Set the token expiry as 20 minutes from now
        builder.setExpiration(new Date((new Date()).getTime() + 1200000));
        builder.signWith(SignatureAlgorithm.HS256, "secretkey");
        String token = builder.compact();
        LOGGER.debug("Generated token: {}", token);
        LOGGER.debug("End generateJwt()");
        return token;
    }
}
