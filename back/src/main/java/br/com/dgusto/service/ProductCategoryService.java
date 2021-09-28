package br.com.dgusto.service;

import br.com.dgusto.domain.ProductCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductCategoryService {

    ProductCategory save(ProductCategory productCategory);

    ProductCategory update(ProductCategory productCategory);

    ProductCategory get(Long id);

    Page<ProductCategory> getAll(Pageable pageable);

    void delete(Long id);
}
