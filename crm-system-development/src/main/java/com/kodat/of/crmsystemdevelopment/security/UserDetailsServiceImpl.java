package com.kodat.of.crmsystemdevelopment.security;

import com.kodat.of.crmsystemdevelopment.user.entity.CustomUserDetails;
import com.kodat.of.crmsystemdevelopment.user.entity.User;
import com.kodat.of.crmsystemdevelopment.user.entity.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserDetailsServiceImpl.class);
    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->{
                    LOGGER.error("User  not found with username: {}", username);
                    return new UsernameNotFoundException("User not found with username: " + username);
                });
        return new CustomUserDetails(user);
    }
}
