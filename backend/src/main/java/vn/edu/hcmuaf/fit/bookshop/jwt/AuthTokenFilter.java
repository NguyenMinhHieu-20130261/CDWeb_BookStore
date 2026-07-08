package vn.edu.hcmuaf.fit.bookshop.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.repository.UserRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.TokenRepo;

import java.io.IOException;
import java.util.List;

@Component
public class AuthTokenFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    private final JwtUtils jwtUtils;
    private final UserRepo userRepo;
    private final TokenRepo tokenRepo;
    public AuthTokenFilter(JwtUtils jwtUtils, UserRepo userRepo,TokenRepo tokenRepo) {
        this.jwtUtils = jwtUtils;
        this.userRepo = userRepo;
        this.tokenRepo = tokenRepo;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,HttpServletResponse response,FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = parseJwt(request);
            System.out.println("REQUEST URI: " + request.getRequestURI());
            System.out.println("JWT FROM REQUEST: " + jwt);
            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {

                // var tokenDb = tokenRepo.findByToken(jwt);
                // System.out.println("TOKEN EXISTS DB: " + tokenDb.isPresent());
                // tokenDb.ifPresent(t -> {
                //     System.out.println("TOKEN DB USER ID: " + t.getUser().getId());
                //     System.out.println("TOKEN EXPIRED: " + t.isExpired());
                //     System.out.println("TOKEN REVOKED: " + t.isRevoked());
                // });
                // boolean isTokenValid = true;

                boolean isTokenValid = tokenRepo.findByToken(jwt)
                                                .map(t -> !t.isExpired() && !t.isRevoked())
                                                .orElse(false);
                if (!isTokenValid) {
                    filterChain.doFilter(request, response);
                    return;
                }
                String username = jwtUtils.getUserNameFromJwtToken(jwt);
                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    User user = userRepo.findByUsername(username).orElse(null);
                    if (user != null) {
                        
                        String role = jwtUtils.getRoleFromJwtToken(jwt);
                        List<SimpleGrantedAuthority> authorities = List.of();

                        if (role != null && !role.isBlank()) {
                            authorities = List.of(
                                    new SimpleGrantedAuthority("ROLE_" + role)
                            );
                        }
                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(user,null,authorities);
                        authentication.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                        );
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            }
        } catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e.getMessage());
        }
        filterChain.doFilter(request, response);
    }
    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }
        return null;
    }
}