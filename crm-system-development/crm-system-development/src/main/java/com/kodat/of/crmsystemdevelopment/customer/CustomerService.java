package com.kodat.of.crmsystemdevelopment.customer;


import com.kodat.of.crmsystemdevelopment.common.PageResponse;
import com.kodat.of.crmsystemdevelopment.user.entity.CustomUserDetails;
import com.kodat.of.crmsystemdevelopment.user.entity.User;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final Logger LOG = LoggerFactory.getLogger(CustomerService.class);

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

    public CustomerResponse findByCustomerId(Integer customerId) {

       return customerRepository.findById(customerId)
               .map(customerMapper::toCustomerResponse)
                .orElseThrow(()->
                new EntityNotFoundException("Customer with id " + customerId + " not found"));
    }


    public PageResponse<CustomerResponse> findAllCustomers(int page, int size, Authentication connectedUser) {
        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();
        Pageable pageable = PageRequest.of(page,size, Sort.by("registrationDate").descending());
        Page<Customer> customers = customerRepository.findAll(pageable);
        List<CustomerResponse> customerResponses = customers.stream()
                .map(customerMapper::toCustomerResponse)
                .toList();

        return new PageResponse<>(
                customerResponses,
                customers.getNumber(),
                customers.getSize(),
                customers.getTotalElements(),
                customers.getTotalPages(),
                customers.isFirst(),
                customers.isLast()
        );

    }

    public CustomerResponse updateCustomer(Integer customerId, CustomerRequest request, Authentication connectedUser) {

        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(()-> new EntityNotFoundException("Customer with id " + customerId + " not found"));

        customer.setFirstName(request.firstName());
        customer.setLastName(request.lastName());
        customer.setEmail(request.email());
        customer.setRegion(request.region());

        LOG.info(customer.toString());

        customerRepository.save(customer);

        return customerMapper.toCustomerResponse(customer);
    }

    public void deleteCustomer(Integer customerId, Authentication connectedUser) {
        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(()-> new EntityNotFoundException("Customer with id " + customerId + " not found"));

        customerRepository.delete(customer);

    }
}





