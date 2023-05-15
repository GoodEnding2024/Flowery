package com.flowery.backend.config;

import com.flowery.backend.jwt.JwtAuthenticationFilter;
import com.flowery.backend.jwt.JwtProvider;
import com.flowery.backend.sevice.UsersDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtProvider jwtProvider;
    private final UsersDetailService usersDetailService;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .authorizeRequests()
//                .antMatchers("/**").permitAll()
////                .antMatchers("/messages/**").permitAll()
////                .antMatchers("/myGarden/**").permitAll()
////                .antMatchers("/reservation/**").permitAll()
////                .antMatchers("/storage/**").permitAll()
////                .antMatchers("/sales/**").permitAll()
////                .antMatchers("/stores/**").permitAll()
////                .antMatchers("/users/**").permitAll()
//                .anyRequest().authenticated()
//                .and()
//                .formLogin()
//                .and()
//                .csrf().disable()
//                .httpBasic();

        http.cors().and().csrf().disable()
                .exceptionHandling()
                .authenticationEntryPoint(customAuthenticationEntryPoint)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/users/sign-up", "/users/login-user", "/users/login-seller", "/token/rtk").permitAll()
                .antMatchers("/test3/hi-user").hasRole("USER")
                .antMatchers("/test3/hi-seller").hasRole("SELLER")
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtProvider, usersDetailService),
                        UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public CommonsMultipartResolver multipartResolver() {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setDefaultEncoding("UTF-8"); // 파일 인코딩 설정
        multipartResolver.setMaxUploadSizePerFile(5 * 1024 * 1024 * 12); // 파일당 업로드 크기 제한 (60MB)
        return multipartResolver;
    }

}