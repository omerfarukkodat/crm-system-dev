package com.kodat.of.crmsystemdevelopment.customer;


import com.kodat.of.crmsystemdevelopment.user.entity.CustomUserDetails;
import com.kodat.of.crmsystemdevelopment.user.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    public CustomerService(CustomerRepository customerRepository, CustomerMapper customerMapper) {
        this.customerRepository = customerRepository;
        this.customerMapper = customerMapper;
    }

    public Integer saveCustomer(CustomerRequest request, Authentication connectedUser) {

        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();
        Customer customer = customerMapper.toCustomer(request);
        customer.setUser(user);

      return customerRepository.save(customer).getId();


    }
}
