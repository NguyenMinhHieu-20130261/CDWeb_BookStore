package vn.edu.hcmuaf.fit.bookshop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

import vn.edu.hcmuaf.fit.bookshop.jwt.AuthEntryPointJwt;
import vn.edu.hcmuaf.fit.bookshop.jwt.AuthTokenFilter;

@Configuration
public class SecurityConfig {

    private final CorsConfigurationSource corsConfigurationSource;
    private final AuthTokenFilter authTokenFilter;
    private final AuthEntryPointJwt unauthorizedHandler;

    public SecurityConfig(CorsConfigurationSource corsConfigurationSource,
        AuthTokenFilter authTokenFilter,
        AuthEntryPointJwt unauthorizedHandler) {
        this.corsConfigurationSource = corsConfigurationSource;
        this.authTokenFilter = authTokenFilter;
        this.unauthorizedHandler = unauthorizedHandler;
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            .csrf(AbstractHttpConfigurer::disable)
            .exceptionHandling(exception ->
                    exception.authenticationEntryPoint(unauthorizedHandler)
            )
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .formLogin(AbstractHttpConfigurer::disable)
            .httpBasic(AbstractHttpConfigurer::disable)
            // .authorizeHttpRequests(auth -> auth
            //     .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
            //     .requestMatchers("/api/auth/**").permitAll()
            //     // AUTH
            //     .requestMatchers("/api/userinfo/**").authenticated()
            //     .requestMatchers("/api/address/**").authenticated()
            //     .requestMatchers("/api/cart/**").authenticated()
            //     .requestMatchers(HttpMethod.POST, "/api/reviews/**").authenticated()
            //     .requestMatchers(HttpMethod.PUT, "/api/reviews/**").authenticated()
            //     .requestMatchers(HttpMethod.DELETE, "/api/reviews/**").authenticated()
            //     // PUB
            //     .requestMatchers("/api/category/**").permitAll()
            //     .requestMatchers("/api/products/**").permitAll()
            //     .requestMatchers("/api/blog-cate/**").permitAll()
            //     .requestMatchers("/api/blogs/**").permitAll()
            //     .requestMatchers("/api/blog-detail/**").permitAll()
            //     .requestMatchers("/api/search/**").permitAll()
            //     .requestMatchers("/api/reviews/**").permitAll()
            //     .anyRequest().authenticated()
            // );
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()
            );
        http.addFilterBefore(authTokenFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}