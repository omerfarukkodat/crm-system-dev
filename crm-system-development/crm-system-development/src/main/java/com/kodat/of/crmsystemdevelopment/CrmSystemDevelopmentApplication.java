package com.kodat.of.crmsystemdevelopment;

import com.kodat.of.crmsystemdevelopment.user.role.Role;
import com.kodat.of.crmsystemdevelopment.user.role.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;

import java.time.LocalDateTime;

@SpringBootApplication
@EnableAsync
public class CrmSystemDevelopmentApplication {

    public static void main(String[] args) {
        SpringApplication.run(CrmSystemDevelopmentApplication.class, args);
    }


    @Bean
    public CommandLineRunner run(RoleRepository repository) {
        return args -> {
            if (repository.findByName("USER").isEmpty()){
                repository.save(Role.builder().name("USER").build());
            }
        };

    }
}
