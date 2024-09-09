package com.kodat.of.crmsystemdevelopment.handler;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public enum BusinessErrorCodes {

    CUSTOMER_NOT_FOUND(404, HttpStatus.NOT_FOUND, "Customer Not Found"),
    ENTITY_NOT_FOUND(404,HttpStatus.NOT_FOUND,"Entity not found"),
    DATA_INTEGRITY_VIOLATION(409,HttpStatus.CONFLICT,"Data Integrity Violation"),
    VALIDATION_ERROR(400,HttpStatus.BAD_REQUEST,"Validation Error"),
    USER_ALREADY_EXISTS(409,HttpStatus.CONFLICT,"User already Exists"),
    ROLE_NOT_FOUND(404,HttpStatus.NOT_FOUND,"Role not found")
    {

    };


    @Getter
    private final int code;
    @Getter
    private final HttpStatus httpStatus;
    @Getter
    private final String description;

    BusinessErrorCodes(int code, HttpStatus httpStatus, String description) {
        this.code = code;
        this.httpStatus = httpStatus;
        this.description = description;
    }
}
