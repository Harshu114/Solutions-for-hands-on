package com.cognizant.jwtlearn.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Hardcoded in-memory users matching the handson:
     *   user / pwd / ROLE_USER
     *   admin / pwd / ROLE_ADMIN
     */
    @Bean
    public InMemoryUserDetailsManager userDetailsService() {
        UserDetails user = User.withUsername("user")
                .password("pwd")
                .roles("USER")
                .build();
        UserDetails admin = User.withUsername("admin")
                .password("pwd")
                .roles("ADMIN")
                .build();
        return new InMemoryUserDetailsManager(user, admin);
    }

    /**
     * The handson's SecurityConfig used WebSecurityConfigurerAdapter. That class
     * is removed in Spring Security 6 (which Spring Boot 3.x ships with), so we
     * use the modern SecurityFilterChain bean form instead. Behaviour is the
     * same as the handson: /authenticate is open to USER+ADMIN, /countries to
     * USER only, every other request is authenticated via HTTP Basic.
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/authenticate").hasAnyRole("USER", "ADMIN")
                .requestMatchers("/countries").hasRole("USER")
                .anyRequest().authenticated()
            )
            .httpBasic();
        return http.build();
    }

    /**
     * Spring Security 6 requires a PasswordEncoder bean. NoOpPasswordEncoder
     * keeps the handson's plain-text "pwd" password working.
     */
    @Bean
    @SuppressWarnings("deprecation")
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }
}
