package com._project.serverside.orders;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com._project.serverside.items.Item;
import com._project.serverside.items.ItemRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Component
public class OrderDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ItemRepository itemRepo;

    @Transactional
    public Order create(Order orderFromClient) {
        Order realOrder = new Order();
        realOrder.setDateTime(LocalDateTime.now());
        realOrder.setTableNumber(orderFromClient.getTableNumber());

        entityManager.persist(realOrder);

        BigDecimal totalCost = new BigDecimal(0);

        for (OrderItem clientItem : orderFromClient.getItems()) {
            OrderItem realItem = new OrderItem();

            realItem.setOrderid(realOrder.getId());
            realItem.setItemid(clientItem.getItemid());
            realItem.setQty(clientItem.getQty());
            realItem.setItem_cost(clientItem.getItem_cost());
            realItem.setName(clientItem.getName());
            realItem.setDescription(clientItem.getDescription());

            // We also need to update the QOO on the product table
            Item itemToUpdate = itemRepo.getReferenceById(clientItem.getItemid());
            itemToUpdate.setAmount(itemToUpdate.getAmount() - clientItem.getQty());

            // And calculate total PO cost by accumulating each line item quantity and price
            totalCost = totalCost.add(itemToUpdate.getItem_cost().multiply(new BigDecimal(clientItem.getQty())));

            itemRepo.saveAndFlush(itemToUpdate);
            entityManager.persist(realItem);
        }

        totalCost = totalCost.multiply(new BigDecimal(1.13)); // Add 13% tax
        System.out.println(totalCost);
        realOrder.setTotalPrice(totalCost);
        realOrder.setItems(orderFromClient.getItems());

        entityManager.flush();
        entityManager.refresh(realOrder);

        return realOrder;
    }
}
