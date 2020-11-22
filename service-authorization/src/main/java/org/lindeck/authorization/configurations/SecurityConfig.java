package org.lindeck.authorization.configurations;

import org.lindeck.authorization.JWTLoginFilter;
import org.lindeck.security.CommonSecurity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter implements WebMvcConfigurer {
    @Autowired
    CommonSecurity commonSecurity;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(commonSecurity.authenticationProvider());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
           .csrf().disable()
           .authorizeRequests()
                .antMatchers("/register").permitAll()
                .anyRequest().authenticated()
                .and()
           .addFilterAfter(new JWTLoginFilter("/login", authenticationManager()),
                        UsernamePasswordAuthenticationFilter.class);
    }
}
