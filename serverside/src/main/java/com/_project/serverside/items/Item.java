package com._project.serverside.items;

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
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;
    private String item_name;
    private BigDecimal amount;
    private String Description;
    private BigDecimal item_order_cost;
    private BigDecimal item_cost;
}
