package com._project.serverside.reports;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportDAO reportDAO;

    @Autowired
    private ReportRepository reportRepository;

    @PostMapping
    public ResponseEntity<Report> addOne(@RequestBody Report report) {
        return new ResponseEntity<Report>(reportDAO.create(report), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Iterable<Report>> findAll() {
        Iterable<Report> reports = reportRepository.findAll();
        return new ResponseEntity<Iterable<Report>>(reports, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Iterable<Report>> findByEmployee(@PathVariable Long id) {
        return new ResponseEntity<Iterable<Report>>(reportRepository.findByEmployeeid(id), HttpStatus.OK);
    }
}
