package br.com.dgusto.repository;

import br.com.dgusto.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "SELECT product.id, product.name, product.description, product.value, product.productType FROM product WHERE productType = 'PIZZA_FLAVOR' ", nativeQuery = true)
    Page<Product> findAllPizzaFlavors(Pageable pageable);

    @Query(value = "SELECT  product.id, product.name, product.description, product.value, product.productType FROM product WHERE productType = 'PIZZA_SIZE' ", nativeQuery = true)
    Page<Product> findAllPizzaSizes(Pageable pageable);

    @Query(value = "SELECT  product.id, product.name, product.description, product.value, product.productType FROM product WHERE productType = 'DRINK' ", nativeQuery = true)
    Page<Product> findAllDrinks(Pageable pageable);

    @Query(value = "SELECT  product.id, product.name, product.description, product.value, product.productType FROM product WHERE productType = 'OTHER' ", nativeQuery = true)
    Page<Product> findAllOthers(Pageable pageable);
}
