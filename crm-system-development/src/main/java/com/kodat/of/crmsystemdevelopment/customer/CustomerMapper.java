package com.kodat.of.crmsystemdevelopment.customer;

import org.springframework.stereotype.Service;

@Service
public class CustomerMapper {

    public Customer toCustomer(CustomerRequest request){
        return Customer.builder()
                .id(request.id())
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .region(request.region())
                .build();

    }

    public CustomerResponse toCustomerResponse(Customer customer){

        return CustomerResponse
                .builder()
                .id(customer.getId())
                .firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .email(customer.getEmail())
                .region(customer.getRegion())
                .createdByUser(customer.getUser().getUsername())
                .registrationDate(customer.getRegistrationDate())
                .build();

    }


}
