package com.leonardo.hug.interaction;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.leonardo.hug.product.Product;
import com.leonardo.hug.user.User;

@Repository
public interface InteractionRepository extends JpaRepository<Interaction, Integer> {
    
    Optional<Interaction> findByUserAndProductAndType(User user, Product product, InteractionType type);

    @Query("SELECT i.product " +
           "FROM Interaction i " +
           "WHERE i.user = :user AND i.type = :type")
    Page<Product> findByUserAndType(@Param("user") User user, 
                                    @Param("type") InteractionType type, 
                                    Pageable pageable);

}
