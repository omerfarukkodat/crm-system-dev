package com.kodat.of.crmsystemdevelopment.customer;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {


    Page<Customer> findAll(Pageable pageable);

    boolean existsByEmail(String email);

}
