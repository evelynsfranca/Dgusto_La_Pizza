package br.com.dgusto.domain.constants;

public class SecurityConstants {

    // Authorization Bearer

    public static final String SECRET = "devDgustoLaPizza";

    public static final String TOKEN_PREFIX = "Bearer ";

    public static final String HEADER_STRING = "Authorization";

    public static final String SIGN_UP_URL = "/login";

    public static final Long EXPIRATION_TIME = 86400000L; // 1 dia
}
