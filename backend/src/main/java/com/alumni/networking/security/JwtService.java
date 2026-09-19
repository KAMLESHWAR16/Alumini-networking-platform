package com.alumni.networking.security;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Date;

import javax.crypto.SecretKey;

import com.alumni.networking.model.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    private final SecretKey signingKey;
    private final long expiration;

    public JwtService(
        @Value("${jwt.secret:}") String configuredSecret,
        @Value("${jwt.expiration:86400000}") long expiration
    ) {
        this.signingKey = createSigningKey(configuredSecret);
        this.expiration = expiration;
    }

    public String generateToken(User user) {
        Date issuedAt = new Date();
        return Jwts.builder()
            .subject(user.getUsername())
            .claim("userId", user.getId())
            .claim("role", user.getRole().name())
            .issuedAt(issuedAt)
            .expiration(new Date(issuedAt.getTime() + expiration))
            .signWith(signingKey)
            .compact();
    }

    public String extractUsername(String token) {
        return parseClaims(token).getSubject();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        Claims claims = parseClaims(token);
        return claims.getSubject().equalsIgnoreCase(userDetails.getUsername())
            && claims.getExpiration().after(new Date());
    }

    private Claims parseClaims(String token) {
        return Jwts.parser().verifyWith(signingKey).build().parseSignedClaims(token).getPayload();
    }

    private SecretKey createSigningKey(String configuredSecret) {
        if (configuredSecret == null || configuredSecret.isBlank()) {
            byte[] randomSecret = new byte[32];
            new SecureRandom().nextBytes(randomSecret);
            return Keys.hmacShaKeyFor(randomSecret);
        }

        try {
            byte[] digest = MessageDigest.getInstance("SHA-256")
                .digest(configuredSecret.getBytes(StandardCharsets.UTF_8));
            return Keys.hmacShaKeyFor(digest);
        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException("Unable to initialize JWT signing key", exception);
        }
    }
}