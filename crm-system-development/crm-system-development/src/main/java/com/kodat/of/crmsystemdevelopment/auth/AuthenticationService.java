package com.kodat.of.crmsystemdevelopment.auth;


import com.kodat.of.crmsystemdevelopment.exception.RoleNotFoundException;
import com.kodat.of.crmsystemdevelopment.exception.UserAlreadyExistsException;
import com.kodat.of.crmsystemdevelopment.security.JwtService;
import com.kodat.of.crmsystemdevelopment.user.entity.CustomUserDetails;
import com.kodat.of.crmsystemdevelopment.user.entity.User;
import com.kodat.of.crmsystemdevelopment.user.entity.UserRepository;
import com.kodat.of.crmsystemdevelopment.user.role.RoleRepository;
import com.kodat.of.crmsystemdevelopment.user.token.TokenRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.HashMap;
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

        if (userRepository.existsByUsername(request.getUsername())){
            throw new UserAlreadyExistsException("User with username " + request.getUsername() + " already exists.");
        }


        var userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RoleNotFoundException("Role Not Found"));

        var user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(false)
                .enabled(true)
                .roles(List.of(userRole))
                .build();

        userRepository.save(user);
    }

    public AuthenticateResponse authenticate(AuthenticateRequest request) {


       try {


        var auth = authenticationManager
                .authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getUsername(),
                                request.getPassword()));

        var claims = new HashMap<String,Object>();
        var customUserDetails = (CustomUserDetails) auth.getPrincipal();
        var user = customUserDetails.getUser();
        claims.put("username", user.getUsername());
        var jwtToken = jwtService.generateToken(claims,customUserDetails);
        return AuthenticateResponse
                .builder()
                .token(jwtToken)
                .build();

    }catch (AuthenticationException e){
       throw new RuntimeException("Authentication Failed" + e.getMessage());
       }
    }
}
