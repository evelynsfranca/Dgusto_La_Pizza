package br.com.dgusto.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Map;


public class AuthenticationToken extends AbstractAuthenticationToken {

    private static final long serialVersionUID = 1L;

    private final Object principal;
    private String credentials;
    private Long userId;

    public AuthenticationToken(Object principal, String credentials) {
        super(null);
        this.principal = principal;
        this.credentials = credentials;
        setAuthenticated(false);
    }

    public AuthenticationToken(Object principal, String credentials, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.principal = principal;
        this.credentials = credentials;
        super.setAuthenticated(true);
    }

    public AuthenticationToken(Object principal, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.principal = principal;
        this.credentials = "";
        super.setAuthenticated(true);
    }

    public AuthenticationToken(Object principal, String credentials, Collection<? extends GrantedAuthority> authorities, Long userId) {
        super(authorities);
        this.principal = principal;
        this.credentials = credentials;
        this.userId = userId;
        super.setAuthenticated(true);
    }

    public AuthenticationToken(Object principal, String credentials, Map<String, String> parameters) {
        super(null);
        this.principal = principal;
        this.credentials = credentials;
        setDetails(parameters);
        setAuthenticated(false);
    }

    @Override
    public String getCredentials() {
        return credentials;
    }

    @Override
    public Object getPrincipal() {
        return principal;
    }
}
