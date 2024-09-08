package com.kodat.of.crmsystemdevelopment.customer;

import jakarta.validation.constraints.*;

public record CustomerRequest(
        @NotNull(message = "Customer ID is required")
        Integer id,
        @NotBlank(message = "First name is required")
        @Size(max = 50, message = "First name cannot exceed 50 characters")
        @NotEmpty(message = "100")
        @NotNull(message = "100")
        String firstName,

        @NotBlank(message = "Last name is required")
        @Size(max = 50, message = "Last name cannot exceed 50 characters")
        @NotNull(message = "101")
        @NotEmpty(message = "101")
        String lastName,

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email address")
        @Size(max = 100, message = "Email cannot exceed 100 characters")
        @NotEmpty(message = "102")
        @NotNull(message = "102")
        String email,

        @NotBlank(message = "Region is required")
        @Size(max = 50, message = "Region cannot exceed 50 characters")
        @NotEmpty(message = "103")
        @NotNull(message = "103")
        String region
) {

}

