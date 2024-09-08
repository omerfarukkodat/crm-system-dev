package com.kodat.of.crmsystemdevelopment.customer;


import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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




}
