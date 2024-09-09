package com.kodat.of.crmsystemdevelopment.exception;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public class UserAlreadyExistsException extends RuntimeException {
public UserAlreadyExistsException(String message) {
    super(message);
}
}

