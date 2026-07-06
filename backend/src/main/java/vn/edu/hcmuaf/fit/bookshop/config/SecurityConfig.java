package vn.edu.hcmuaf.fit.bookshop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

import vn.edu.hcmuaf.fit.bookshop.jwt.AuthEntryPointJwt;
import vn.edu.hcmuaf.fit.bookshop.jwt.AuthTokenFilter;

@EnableMethodSecurity
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
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/error").permitAll()
                // PUB
                .requestMatchers(HttpMethod.GET, "/api/category/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/notifications/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/products-images/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/blogs/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/blog-cate/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/blog-detail/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/search/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/banners/active").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/reviews/product/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/reviews/*").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/notifications/**").permitAll()
                //vnpay
                .requestMatchers(HttpMethod.GET, "/api/payments/vnpay/return").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/payments/vnpay/ipn").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/payments/vnpay/create").authenticated()
                /// ADMIN
                // order
                .requestMatchers(HttpMethod.GET, "/api/orders").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/orders/{id}").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/orders/{id}").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/orders/{id}").hasRole("ADMIN")
                // Product
                .requestMatchers(HttpMethod.POST, "/api/products/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/products/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/products/**").hasRole("ADMIN")
                //product image
                .requestMatchers(HttpMethod.POST, "/api/products-images/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/products-images/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/products-images/**").hasRole("ADMIN")
                //catgegory
                .requestMatchers(HttpMethod.POST, "/api/category/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/category/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/category/**").hasRole("ADMIN")
                //blog
                .requestMatchers(HttpMethod.POST, "/api/blogs/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/blogs/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/blogs/**").hasRole("ADMIN")
                //blog cate
                .requestMatchers(HttpMethod.POST, "/api/blog-cate/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/blog-cate/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/blog-cate/**").hasRole("ADMIN")
                //Inventory
                .requestMatchers(HttpMethod.GET, "/api/inventory/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/inventory/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/inventory/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/inventory/**").hasRole("ADMIN")
                //banner
                .requestMatchers(HttpMethod.GET, "/api/banners/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/banners/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/banners/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/banners/**").hasRole("ADMIN")
                //promotions
                .requestMatchers("/api/promotions/**").hasRole("ADMIN")
                //user
                .requestMatchers("/api/users/**").hasRole("ADMIN")
                //address
                .requestMatchers(HttpMethod.GET, "/api/address").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/address/detail/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/address/{id}").hasRole("ADMIN")
                //review
                .requestMatchers(HttpMethod.GET, "/api/reviews").hasRole("ADMIN")
                //notification
                .requestMatchers(HttpMethod.POST, "/api/notifications/broadcast").hasRole("ADMIN")

                // AUTH user
                .requestMatchers("/api/userinfo/**").authenticated()
                .requestMatchers("/api/address/**").authenticated()
                .requestMatchers("/api/cart/**").authenticated()
                //order
                .requestMatchers(HttpMethod.GET, "/api/orders/user").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/orders/detail/**").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/orders/create").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/orders/cancel/**").authenticated()
                .requestMatchers("/api/order-status/**").authenticated()
                //review
                .requestMatchers(HttpMethod.POST, "/api/reviews/**").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/reviews/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/reviews/**").authenticated()
                //notify
                .requestMatchers(HttpMethod.POST, "/api/notifications/**").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/notifications/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/notifications/**").authenticated()
                //api riêng cho promotion user
                .requestMatchers(HttpMethod.GET, "/api/promotions/validate").authenticated()
                .requestMatchers("/api/address/**").authenticated()
                .anyRequest().authenticated()
            );
            // .authorizeHttpRequests(auth -> auth
            //     .anyRequest().permitAll()
            // );
        http.addFilterBefore(authTokenFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}