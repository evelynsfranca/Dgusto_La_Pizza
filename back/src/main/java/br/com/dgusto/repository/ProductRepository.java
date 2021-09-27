package br.com.dgusto.repository;

import br.com.dgusto.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "SELECT * FROM product p WHERE p.product_type = 'PIZZA_FLAVOR' ORDER BY id \n-- #pageable\n", nativeQuery = true)
    Page<Product> findAllPizzaFlavors(Pageable pageable);

    @Query(value = "SELECT * FROM product p WHERE p.product_type = 'PIZZA_SIZE' ORDER BY id \n-- #pageable\n ", nativeQuery = true)
    Page<Product> findAllPizzaSizes(Pageable pageable);

    @Query(value = "SELECT * FROM product p WHERE p.product_type = 'DRINK' ORDER BY id \n-- #pageable\n ", nativeQuery = true)
    Page<Product> findAllDrinks(Pageable pageable);

    @Query(value = "SELECT * FROM product p WHERE p.product_type = 'OTHER' ORDER BY id \n-- #pageable\n ", nativeQuery = true)
    Page<Product> findAllOthers(Pageable pageable);
}
