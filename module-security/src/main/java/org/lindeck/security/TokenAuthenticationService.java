package org.lindeck.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Collections;
import java.util.Date;

public class TokenAuthenticationService {
     
    static final long EXPIRATIONTIME = 864_000_000; // 10 days
     
    static final String SECRET = "AbC0FGWEF1";
     
    static final String TOKEN_PREFIX = "Bearer";
     
    static final String HEADER_STRING = "Authorization";
 
    public static void addAuthentication(HttpServletResponse res, String username) {
        String JWT = Jwts.builder().setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                .signWith(SignatureAlgorithm.HS512, SECRET).compact();
        try {
            Cookie cookie = new Cookie(HEADER_STRING, URLEncoder.encode(TOKEN_PREFIX + " " + JWT, "UTF-8"));
            cookie.setPath("/");
            res.addCookie(cookie);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        // if we want to save jwt string in header:
        // res.addHeader(HEADER_STRING, TOKEN_PREFIX + " " + JWT);
    }
 
    public static Authentication getAuthentication(HttpServletRequest request) {
        String token = null;
        Cookie cookie = null;
        for (Cookie candidate : request.getCookies()) {
            if (candidate.getName().equals(HEADER_STRING)) {
                cookie = candidate;
            }
        }
        if (cookie == null) {
            return null;
        }
        try {
            token = URLDecoder.decode(cookie.getValue(), "UTF-8");
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        // if we want to save jwt string in header
        // token = request.getHeader(HEADER_STRING);
        if (token != null) {
            // parse the token.
            String user = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token.replace(TOKEN_PREFIX, "")).getBody()
                    .getSubject();
 
            return user != null ? new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList()) : null;
        }
        return null;
    }
     
}