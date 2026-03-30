package com.leonardo.hug.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.leonardo.hug.category.Category;


public interface ProductRepository extends JpaRepository<Product, Long>{

	Page<Product> findByCategory(Category category, Pageable pageable);

	@Query("SELECT p " +
			"FROM Product p " +
			"JOIN p.sales s " +
			"WHERE p.category = :category " +
			"GROUP BY p " +
			"ORDER BY COUNT(s) DESC")
	Page<Product> findTopSellingProductsByCategory(Category category, Pageable pageable);

	@Query("SELECT p " +
			"FROM Product p " +
			"JOIN Sale s ON p.id = s.product.id " +
			"WHERE s.user.id IN (SELECT s2.user.id FROM Sale s2 WHERE s2.product.id = :productId) " +
			"AND p.id != :productId " +
			"GROUP BY p.id " +
			"ORDER BY COUNT(s.id) DESC")
	Page<Product> findRelatedProductsByUserPurchases(@Param("productId") Long productId, Pageable pageable);
   
	@Query("SELECT p, COUNT(i) AS likeCount " +
			"FROM Product p " +
			"JOIN Interaction i ON p.id = i.product.id " +
		   	"WHERE i.type = 'LIKE' " +
		   	"AND p.category = :category " +
		   	"GROUP BY p " +
		   	"ORDER BY likeCount DESC")
	Page<Product> findRecommendedProductsByLikes(Category category, Pageable pageable);

	@Query("SELECT p FROM Product p WHERE p.category = :category ORDER BY RANDOM()")
	Page<Product> findRandomProducts(Pageable pageable, @Param("category") Category category);

	@Query("SELECT p FROM Product p " +
		   "WHERE p.id NOT IN (SELECT i.product.id FROM Interaction i WHERE i.user.id = :userId AND i.type = 'VIEW')")
	Page<Product> findProductsNotViewedByUser(int userId, Pageable pageable);

}