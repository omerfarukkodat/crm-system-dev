package com.kodat.of.crmsystemdevelopment.customer;


import com.kodat.of.crmsystemdevelopment.common.PageResponse;
import com.kodat.of.crmsystemdevelopment.exception.CustomerNotFoundException;
import com.kodat.of.crmsystemdevelopment.user.entity.CustomUserDetails;
import com.kodat.of.crmsystemdevelopment.user.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CustomerService {

    private static final Logger LOGGER = LoggerFactory.getLogger(CustomerService.class);


    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    public CustomerService(CustomerRepository customerRepository, CustomerMapper customerMapper) {
        this.customerRepository = customerRepository;
        this.customerMapper = customerMapper;
    }

    public Integer saveCustomer(CustomerRequest request, Authentication connectedUser) {



        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();

        if (customerRepository.existsByEmail(request.email())){
            LOGGER.error("Email {} already exists" , request.email());
            throw new DataIntegrityViolationException("Email " + request.email() + " already exists");
        }

        Customer customer = customerMapper.toCustomer(request);
        customer.setUser(user);

        try {
            customerRepository.save(customer);
            LOGGER.info("Customer {} created successfully by user {}", customer.getId(), user.getUsername());
            return customer.getId();
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("Duplicate email or data integrity violation occurred");
        }
    }

    public CustomerResponse findByCustomerId(Integer customerId) {
        LOGGER.info("Finding customer by id {}", customerId);
        return customerRepository.findById(customerId).map(customerMapper::toCustomerResponse).orElseThrow(() -> {
            LOGGER.warn("Customer with id {} not found", customerId);
            return new CustomerNotFoundException("Customer with id " + customerId + " not found");
        });
    }


    public PageResponse<CustomerResponse> findAllCustomers(int page, int size, Authentication connectedUser) {
        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();
        Pageable pageable = PageRequest.of(page, size, Sort.by("registrationDate").descending());
        Page<Customer> customers = customerRepository.findAll(pageable);
        List<CustomerResponse> customerResponses = customers.stream().map(customerMapper::toCustomerResponse).toList();

        LOGGER.info("Customers found.There are {} customers", customers.getTotalElements());
        return new PageResponse<>(customerResponses, customers.getNumber(), customers.getSize(), customers.getTotalElements(), customers.getTotalPages(), customers.isFirst(), customers.isLast());

    }

    public CustomerResponse updateCustomer(Integer customerId, CustomerRequest request, Authentication connectedUser) {

        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();

        Customer customer = customerRepository.findById(customerId).orElseThrow(() -> {
            LOGGER.warn("Customer with id {} not found for update", customerId);
            return new CustomerNotFoundException("Customer with id " + customerId + " not found");
        });

        customer.setFirstName(request.firstName());
        customer.setLastName(request.lastName());
        customer.setEmail(request.email());
        customer.setRegion(request.region());


        customerRepository.save(customer);
        LOGGER.info("Customer {} updated successfully by user {}", customer.getId(), user.getUsername());

        return customerMapper.toCustomerResponse(customer);
    }

    public void deleteCustomer(Integer customerId, Authentication connectedUser) {
        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();

        Customer customer = customerRepository.findById(customerId).orElseThrow(() -> {

            LOGGER.warn("Customer with id {} not found for delete", customerId);
            return new CustomerNotFoundException("Customer with id " + customerId + " not found");
        });
        LOGGER.info("Customer {} deleted successfully by user {}", customer.getId(), user.getUsername());
        customerRepository.delete(customer);
    }


    public PageResponse<CustomerResponse> filterCustomers(int page, int size, String firstName, String lastName, String email, String region, Authentication connectedUser) {

        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();

        Pageable pageable = PageRequest.of(page, size, Sort.by("registrationDate").descending());
        Page<Customer> customerPage = customerRepository.findAll(pageable);

        Map<String, String> filterCriteria = new HashMap<>();
        filterCriteria.put("firstName", firstName);
        filterCriteria.put("lastName", lastName);
        filterCriteria.put("email", email);
        filterCriteria.put("region", region);

        List<CustomerResponse> customerResponses = customerPage
                .stream()
                .filter(customer -> firstName == null || customer.getFirstName().toLowerCase().startsWith(firstName.toLowerCase()))
                .filter(customer -> lastName == null || customer.getLastName().toLowerCase().startsWith(lastName.toLowerCase()))
                .filter(customer -> email == null || customer.getEmail().toLowerCase().startsWith(email.toLowerCase()))
                .filter(customer -> region == null || customer.getRegion().toLowerCase().startsWith(region.toLowerCase()))
                .map(customerMapper::toCustomerResponse).toList();
        LOGGER.info("Filtered Criteria {} for {} customers", filterCriteria, customerResponses.size());
        return new PageResponse<>(customerResponses, customerPage.getNumber(), customerPage.getSize(), customerPage.getTotalElements(), customerPage.getTotalPages(), customerPage.isFirst(), customerPage.isLast());

    }
}





