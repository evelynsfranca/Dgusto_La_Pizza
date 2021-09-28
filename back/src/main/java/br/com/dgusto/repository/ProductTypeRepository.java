package br.com.dgusto.repository;

import br.com.dgusto.domain.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductTypeRepository extends JpaRepository<ProductType, Long> {

    @Query(value = "SELECT * FROM dgusto.product_type pt WHERE pt.name = :name", nativeQuery = true)
    Optional<ProductType> findByName(String name);
}
