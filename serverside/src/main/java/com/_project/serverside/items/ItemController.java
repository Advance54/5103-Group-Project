package com._project.serverside.items;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class ItemController {
    @Autowired

    private ItemRepository ItemRepository;

    @GetMapping("/api/items")
    public ResponseEntity<Iterable<Item>> findAll() {
        Iterable<Item> expenses = ItemRepository.findAll();
        return new ResponseEntity<Iterable<Item>>(expenses, HttpStatus.OK);
    }

    @PutMapping("/api/items")
    public ResponseEntity<Item> updateOne(@RequestBody Item Item) {

        Item updatedItem = ItemRepository.save(Item);
        return new ResponseEntity<Item>(updatedItem, HttpStatus.OK);
    }

    @PostMapping("/api/items")
    public ResponseEntity<Item> addOne(@RequestBody Item Item) {
        Item newItem = ItemRepository.save(Item);
        return new ResponseEntity<Item>(newItem, HttpStatus.OK);
    }

    @DeleteMapping("/api/items/{id}")
    public ResponseEntity<Integer> deleteOne(@PathVariable String id) {
        return new ResponseEntity<Integer>(ItemRepository.deleteOne(id), HttpStatus.OK);
    }
}