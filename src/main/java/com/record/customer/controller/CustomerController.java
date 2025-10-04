package com.record.customer.controller;

import com.record.customer.model.Customer;
import com.record.customer.service.CustomerService;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;

import java.util.List;


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
                    logger.warn("Customer not found"); // 👈 Logs missing customer
                    return ResponseEntity.notFound().build();
                });
    }

    // Get all customers
    @GetMapping
    public List<Customer> getAllCustomers() {
        logger.info("Fetching all customers");
        return customerService.getAllCustomers();
    }

    // ---------------- CREATE ----------------
    @PostMapping
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        Customer savedCustomer = customerService.saveCustomer(customer);
        logger.info("Created new customer: {}", savedCustomer);
        return ResponseEntity.ok(savedCustomer);
    }

    // ---------------- UPDATE ----------------
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCustomer(@PathVariable Long id, @RequestBody Customer updatedCustomer) {
        return customerService.updateCustomer(id, updatedCustomer)
                .map(customer -> {
                    logger.info("Updated customer with ID {}: {}", id, customer);
                    return ResponseEntity.ok(customer);
                })
                .orElseGet(() -> {
                    logger.warn("Customer with ID {} not found for update", id);
                    return ResponseEntity.notFound().build();
                });
    }

    // ---------------- DELETE ----------------
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long id) {
        boolean deleted = customerService.deleteCustomer(id);
        if (deleted) {
            logger.info("Deleted customer with ID {}", id);
            return ResponseEntity.ok("Customer deleted successfully");
        } else {
            logger.warn("Customer with ID {} not found for deletion", id);
            return ResponseEntity.notFound().build();
        }
    }

}