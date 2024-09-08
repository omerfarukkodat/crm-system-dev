package com.kodat.of.crmsystemdevelopment.customer;


import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("customers")
public class CustomerController {

    private final CustomerService service;

    public CustomerController(CustomerService service) {
        this.service = service;
    }


    @PostMapping
    public ResponseEntity<Integer> saveCustomer(
            @Valid @RequestBody CustomerRequest request,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.saveCustomer(request , connectedUser));
    }

    @GetMapping("{customer-id}")
    public ResponseEntity<CustomerResponse> findCustomerById(
            @PathVariable("customer-id") Integer customerId
    ){
        return ResponseEntity.ok(service.findByCustomerId(customerId));
    }




}
