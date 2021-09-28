package br.com.dgusto.repository;

import br.com.dgusto.domain.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {

    @Query(value = "SELECT * FROM dgusto.product_category pc WHERE pc.name = :name", nativeQuery = true)
    Optional<ProductCategory> findByName(String name);
}
