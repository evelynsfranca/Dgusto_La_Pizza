package br.com.dgusto.resources.auth;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class TokenService {

    private final String token;
    private final SecretKey secretKey;
    private static final long expiration = 10;

    public TokenService(@Value("${dgusto.client-token}") String token) {
        this.token = token;
        this.secretKey = Keys.hmacShaKeyFor(Base64.getDecoder().decode(this.token));
    }

    public String generateToken(Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        String jwtBuilder = Jwts.builder()
                .subject(user.getUsername())
                .issuedAt(Date.from(Instant.now()))
                .expiration(Date.from(Instant.now().plus(expiration, ChronoUnit.HOURS)))
                .signWith(secretKey)
                .compact();

        return jwtBuilder;
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}
