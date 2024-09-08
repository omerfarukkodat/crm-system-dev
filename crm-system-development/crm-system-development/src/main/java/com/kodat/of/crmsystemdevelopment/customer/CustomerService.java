package com.kodat.of.crmsystemdevelopment.customer;


import com.kodat.of.crmsystemdevelopment.common.PageResponse;
import com.kodat.of.crmsystemdevelopment.exception.CustomerNotFoundException;
import com.kodat.of.crmsystemdevelopment.user.entity.CustomUserDetails;
import com.kodat.of.crmsystemdevelopment.user.entity.User;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

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

        try {
            customerRepository.save(customer);
            return customer.getId();
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("Duplicate email or data integrity violation occurred");
        }
    }

    public CustomerResponse findByCustomerId(Integer customerId) {

       return customerRepository.findById(customerId)
               .map(customerMapper::toCustomerResponse)
                .orElseThrow(()->
                new CustomerNotFoundException("Customer with id " + customerId + " not found"));
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
                .orElseThrow(()-> new CustomerNotFoundException("Customer with id " + customerId + " not found"));

        customer.setFirstName(request.firstName());
        customer.setLastName(request.lastName());
        customer.setEmail(request.email());
        customer.setRegion(request.region());


        customerRepository.save(customer);

        return customerMapper.toCustomerResponse(customer);
    }

    public void deleteCustomer(Integer customerId, Authentication connectedUser) {
        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(()-> new CustomerNotFoundException("Customer with id " + customerId + " not found"));

        customerRepository.delete(customer);

    }


    public PageResponse<CustomerResponse>  filterCustomers(
            int page,
            int size,
            String firstName,
            String lastName,
            String email,
            String region,
            Authentication connectedUser) {

        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();

        Pageable pageable = PageRequest.of(page,size, Sort.by("registrationDate").descending());
        Page<Customer> customerPage = customerRepository.findAll(pageable);

        List<CustomerResponse> customerResponses = customerPage.stream()
                .filter(customer -> firstName == null || customer.getFirstName().toLowerCase().startsWith(firstName.toLowerCase()))
                .filter(customer -> lastName == null || customer.getLastName().toLowerCase().startsWith(lastName.toLowerCase()))
                .filter(customer -> email == null || customer.getEmail().toLowerCase().startsWith(email.toLowerCase()))
                .filter(customer -> region == null || customer.getRegion().toLowerCase().startsWith(region.toLowerCase()))
                .map(customerMapper::toCustomerResponse)
                .toList();

        return new PageResponse<>(
                customerResponses,
                customerPage.getNumber(),
                customerPage.getSize(),
                customerPage.getTotalElements(),
                customerPage.getTotalPages(),
                customerPage.isFirst(),
                customerPage.isLast()
        );

    }
}





