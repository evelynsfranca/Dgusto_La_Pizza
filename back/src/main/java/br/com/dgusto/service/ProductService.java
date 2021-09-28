package br.com.dgusto.service;

import br.com.dgusto.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {

    Product save(Product product);

    Product update(Product product);

    Product get(Long id);

    Page<Product> getAll(Pageable pageable);

    Page<Product> findAllProductCategory(String categoryName, Pageable pageable);

    Page<Product> findAllProductType(String typeName, Pageable pageable);

    void delete(Long id);
}
