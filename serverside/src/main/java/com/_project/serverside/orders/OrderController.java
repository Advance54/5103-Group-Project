package com._project.serverside.orders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDAO orderDAO;

    @GetMapping
    public ResponseEntity<Iterable<Order>> findAll() {
        Iterable<Order> orders = orderRepository.findAll();
        return new ResponseEntity<Iterable<Order>>(orders, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Order> addOne(@RequestBody Order order) {
        Order o = orderRepository.save(orderDAO.create(order));
        return new ResponseEntity<Order>(o, HttpStatus.OK);
    }

    // @PutMapping("/{id}")
    // public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody
    // Order order) {
    // return orderRepository.findById(id)
    // .map(existingOrder -> {
    // existingOrder.setTableNumber(order.getTableNumber());
    // existingOrder.setDateTime(order.getDateTime());
    // existingOrder.setItems(order.getItems());
    // existingOrder.setTotalPrice(order.getTotalPrice());
    // Order updatedOrder = orderRepository.save(existingOrder);
    // return ResponseEntity.ok(updatedOrder); // Retorna 200 com a ordem atualizada
    // })
    // .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build()); // Retorna 404
    // se não encontrado
    // }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<Object> deleteOrder(@PathVariable Long id) {
    // return orderRepository.findById(id)
    // .map(order -> {
    // orderRepository.delete(order);
    // return ResponseEntity.noContent().build(); // Retorna 204 No Content
    // })
    // .orElse(ResponseEntity.notFound().build()); // Retorna 404 Not Found
    // }

}
