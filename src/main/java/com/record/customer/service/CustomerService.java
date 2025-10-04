package com.record.customer.service;

import com.record.customer.model.Customer;
import com.record.customer.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }
}
