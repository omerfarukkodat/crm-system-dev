package com.kodat.of.crmsystemdevelopment.customer;


import com.kodat.of.crmsystemdevelopment.common.PageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
@Tag(name = "customer", description = "Endpoints for customer management")
@RestController
@RequestMapping("/customers")
public class CustomerController {
    private final CustomerService service;

    public CustomerController(CustomerService service) {
        this.service = service;
    }


    @PostMapping
    @Operation(summary = "Create a new Customer", description = "Creates a new customer entity")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Customer created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request data")
    })
    public ResponseEntity<Integer> saveCustomer(
            @Valid @RequestBody CustomerRequest request,
            Authentication connectedUser
    ) {
       Integer customerId =  service.saveCustomer(request,connectedUser);
        return ResponseEntity.ok(customerId);
    }

    @GetMapping("{customerId}")
    @Operation(summary = "Find customer by ID", description = "Fetches a customer by their ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Customer found"),
            @ApiResponse(responseCode = "404", description = "Customer not found")
    })
    public ResponseEntity<CustomerResponse> findCustomerById(
            @PathVariable("customerId") Integer customerId
    ) {
        return ResponseEntity.ok(service.findByCustomerId(customerId));
    }

    @GetMapping
    @Operation(summary = "Find All Customers", description = "Fetches all customers")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Customer found"),
            @ApiResponse(responseCode = "404", description = "Customer not found")
    })
    public ResponseEntity<PageResponse<CustomerResponse>> findAllCustomers(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllCustomers(page, size, connectedUser));
    }

    @GetMapping("/filter")
    @Operation(summary = "Find customer with filtering", description = "finding customers with a specific criterion")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Customer found"),
            @ApiResponse(responseCode = "404", description = "Customer not found")
    })
    public ResponseEntity<PageResponse<CustomerResponse>> filterCustomers(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            @RequestParam(name = "firstName", required = false) String firstName,
            @RequestParam(name = "lastName", required = false) String lastName,
            @RequestParam(name = "email", required = false) String email,
            @RequestParam(name = "region", required = false) String region,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.filterCustomers(page, size, firstName, lastName, email, region, connectedUser));
    }

    @PutMapping("/{customerId}")
    @Operation(summary = "Update a customer with id", description = "Updates a customer with specific customer id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Customer created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request data")
    })
    public ResponseEntity<CustomerResponse> updateCustomer(
            @PathVariable("customerId") Integer customerId,
            @RequestBody @Valid CustomerRequest request,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.updateCustomer(customerId, request, connectedUser));
    }

    @DeleteMapping("/{customerId}")
    @Operation(summary = "Delete a Customer", description = "Deletes a customer entity with specific id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Customer created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request data")
    })
    public ResponseEntity<Void> deleteCustomer(
            @PathVariable Integer customerId,
            Authentication connectedUser
    ) {
        service.deleteCustomer(customerId, connectedUser);
        return ResponseEntity.noContent().build();
    }


}
