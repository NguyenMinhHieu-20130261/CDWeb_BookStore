package vn.edu.hcmuaf.fit.bookshop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
public class SecurityConfig {

    private final CorsConfigurationSource corsConfigurationSource;

    public SecurityConfig(CorsConfigurationSource corsConfigurationSource) {
        this.corsConfigurationSource = corsConfigurationSource;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .formLogin(AbstractHttpConfigurer::disable)
            .httpBasic(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/category/**").permitAll()
                .requestMatchers("/api/products/**").permitAll()
                .requestMatchers("/api/userinfo/**").permitAll()
                .requestMatchers("/api/address/**").permitAll()
                .requestMatchers("/api/blog-cate/**").permitAll()
                .requestMatchers("/api/blogs/**").permitAll()
                .requestMatchers("/api/blog-detail/**").permitAll()
                .requestMatchers("/api/search/**").permitAll()
                .anyRequest().authenticated()
            );
            // .authorizeHttpRequests(auth -> auth
            //     .anyRequest().permitAll()
            // );

        return http.build();
    }
}