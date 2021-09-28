package br.com.dgusto.repository;

import br.com.dgusto.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "SELECT * FROM product p WHERE p.product_category_id = :productCategoryId ORDER BY id \n-- #pageable\n", nativeQuery = true)
    Page<Product> findAllProductCategory(Long productCategoryId, Pageable pageable);

    @Query(value = "SELECT * FROM product p WHERE p.product_type_id = :productTypeId ORDER BY id \n-- #pageable\n ", nativeQuery = true)
    Page<Product> findAllProductTypes(Long productTypeId, Pageable pageable);
}
