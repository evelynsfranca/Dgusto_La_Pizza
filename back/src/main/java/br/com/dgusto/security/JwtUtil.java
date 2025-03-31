package br.com.dgusto.security;

import static br.com.dgusto.domain.constants.SecurityConstants.TOKEN_PREFIX;

import java.time.Instant;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    private final String token;
    private final SecretKey secretKey;
    private static final long expiration = 86400000; // 24 horas

    public JwtUtil(@Value("${dgusto.client-token}") String token) {
        this.token = token;
        this.secretKey = Keys.hmacShaKeyFor(this.token.getBytes());
    }

    public String generateToken(String username) {

        return Jwts.builder()
                .subject(username)
                .issuedAt(Date.from(Instant.now()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(secretKey)
                .compact();
    }

    public String extractUsername(String token) {

        String jwt = token.replace(TOKEN_PREFIX, "");

        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(jwt)
                .getPayload()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {

            String jwt = token.replace(TOKEN_PREFIX, "");

            Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(jwt);

            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}
