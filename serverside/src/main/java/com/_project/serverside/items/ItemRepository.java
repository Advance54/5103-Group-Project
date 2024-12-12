package com._project.serverside.items;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "items", path = "items")
@Repository
@CrossOrigin
// again no idea why it's like this, makes no sense
public interface ItemRepository extends JpaRepository<Item, Integer> {
    // extend so we can return the number of rows deleted
    @Modifying
    @CrossOrigin
    @Transactional
    @Query("delete from Item where id = ?1")
    int deleteOne(String id);

    // Deprecated, will use something similar later
    // List<Item> findByVendorid(Long employeeid);

}
