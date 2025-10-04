package com.record.customer.controller;

import com.record.customer.service.CustomerService;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Logger;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private static final Logger logger = LoggerFactory.getLogger(CustomerController.class);

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    // GET endpoint to fetch a customer by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomer(@PathVariable Long id) {
        return customerService.getCustomerById(id)
                .map(customer -> {
                    logger.info("Fetched customer details: {}"); // 👈 Logs the response
                    return ResponseEntity.ok(customer);
                })
                .orElseGet(() -> {
                    logger.warning("Customer not found"); // 👈 Logs missing customer
                    return ResponseEntity.notFound().build();
                });
    }
}