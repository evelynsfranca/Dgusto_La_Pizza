package br.com.dgusto.service;

import br.com.dgusto.domain.ProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductTypeService {

    ProductType save(ProductType productType);

    ProductType update(ProductType productType);

    ProductType get(Long id);

    Page<ProductType> getAll(Pageable pageable);

    void delete(Long id);
}
