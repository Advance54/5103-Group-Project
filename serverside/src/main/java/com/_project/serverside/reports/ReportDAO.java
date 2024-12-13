package com._project.serverside.reports;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Component
public class ReportDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public Report create(Report reportFromClient) {
        Report realReport = new Report();
        realReport.setDatecreated(LocalDateTime.now());
        realReport.setId(reportFromClient.getId());
        entityManager.persist(realReport);
        for (ReportOrder ro : reportFromClient.getReportOrders()) {
            ReportOrder newRO = new ReportOrder();
            newRO.setId(ro.getId());
            newRO.setReportid(realReport.getId());
            entityManager.persist(ro);
        }
        entityManager.flush();
        entityManager.refresh(realReport);
        return realReport;
    }

}
