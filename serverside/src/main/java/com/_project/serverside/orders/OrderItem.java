package com._project.serverside.orders;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@Data
@RequiredArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long orderid; // FK
    private Integer itemid; // FK

    private int qty;

    private String name;
    private String description;
    private BigDecimal item_cost;
}
