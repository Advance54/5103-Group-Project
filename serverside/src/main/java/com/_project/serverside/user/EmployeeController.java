package com._project.serverside.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin
//@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/employees")


public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/api/employees")
    public ResponseEntity<Iterable<Employee>> findAll() {
        Iterable<Employee> employees = employeeRepository.findAll();
        return new ResponseEntity<Iterable<Employee>>(employees, HttpStatus.OK);
    }

    @PutMapping("/api/employees")
    public ResponseEntity<Employee> updateOne(@RequestBody Employee employee) {
        Employee updatedemployee = employeeRepository.save(employee);
        return new ResponseEntity<Employee>(updatedemployee, HttpStatus.OK);
    }

    @PostMapping("/api/employees")
    public ResponseEntity<Employee> addOne(@RequestBody Employee employee) {
        Employee newemployee = employeeRepository.save(employee);
        //return new ResponseEntity<Employee>(newemployee, HttpStatus.OK);
        return new ResponseEntity<>(newemployee, HttpStatus.CREATED); 
    }

    @DeleteMapping("/api/employees/{id}")
    public ResponseEntity<Integer> deleteOne(@PathVariable long id) {
        return new ResponseEntity<Integer>(employeeRepository.deleteOne(id), HttpStatus.OK);
    }
}//EmployeeController

