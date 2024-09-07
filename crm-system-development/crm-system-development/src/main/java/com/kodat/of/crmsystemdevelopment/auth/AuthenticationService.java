package com.kodat.of.crmsystemdevelopment.auth;


import com.kodat.of.crmsystemdevelopment.security.JwtService;
import com.kodat.of.crmsystemdevelopment.user.entity.User;
import com.kodat.of.crmsystemdevelopment.user.entity.UserRepository;
import com.kodat.of.crmsystemdevelopment.user.role.RoleRepository;
import com.kodat.of.crmsystemdevelopment.user.token.TokenRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthenticationService {

    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthenticationService(RoleRepository roleRepository, PasswordEncoder passwordEncoder, UserRepository userRepository, TokenRepository tokenRepository, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }


    public void register(RegistrationRequest request) {

        var userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Role Not Found"));

        var user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(false)
                .enabled(false)
                .roles(List.of(userRole))
                .build();

        userRepository.save(user);
    }
}
