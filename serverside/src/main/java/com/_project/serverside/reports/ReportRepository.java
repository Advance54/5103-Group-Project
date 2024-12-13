package com._project.serverside.reports;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "reports", path = "reports")
public interface ReportRepository extends CrudRepository<Report, Long> {

    @Modifying
    @Transactional
    @Query("delete from Report where id = ?1")
    int deleteOne(Long reportId);

    List<Report> findByEmployeeid(Long employeeid);
}
