package com.kodat.of.crmsystemdevelopment.auth;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@Tag(name = "Authentication")
public class AuthenticationController {
    private final AuthenticationService service;

    public AuthenticationController(AuthenticationService service) {
        this.service = service;
    }


    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @Operation(summary = "Create a new user", description = "Registers a new user username and password.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "User successfully registered"),
            @ApiResponse(responseCode = "400", description = "Invalid request")})
    public ResponseEntity<?> register(
            @RequestBody @Valid RegistrationRequest request) {

        service.register(request);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/authenticate")
    @Operation(summary = "Authenticate user", description = "Authenticates a user and returns a JWT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User authenticated successfully"),
            @ApiResponse(responseCode = "401", description = "Invalid credentials")})
    public ResponseEntity<AuthenticateResponse> authenticate(
            @RequestBody @Valid AuthenticateRequest request
    ){
        return ResponseEntity.ok(service.authenticate(request));
    }


}
