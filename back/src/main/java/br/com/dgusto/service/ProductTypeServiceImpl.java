package br.com.dgusto.service;

import br.com.dgusto.domain.Product;
import br.com.dgusto.domain.ProductType;
import br.com.dgusto.repository.ProductRepository;
import br.com.dgusto.repository.ProductTypeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ProductTypeServiceImpl implements ProductTypeService {

    private final ProductTypeRepository productTypeRepository;
    private final ProductRepository productRepository;

    public ProductTypeServiceImpl(
      ProductTypeRepository productTypeRepository, 
      ProductRepository productRepository
    ) {
        this.productTypeRepository = productTypeRepository;
        this.productRepository = productRepository;
    }

    @Override
    public ProductType save(ProductType productType) {
        return productTypeRepository.save(productType);
    }

    @Override
    public ProductType update(ProductType productType) {
        return productTypeRepository.findById(productType.getId())
            .map(it  -> {
                it.setName(productType.getName());
                return it;
            }).map(productTypeRepository::save)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.productType.notFound"));
    }

    @Override
    public ProductType get(Long id) {
        return productTypeRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.productType.notFound"));
    }

    @Override
    public Page<ProductType> getAll(Pageable pageable) {
        return productTypeRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
        ProductType productType = productTypeRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.productType.notFound"));
        Page<Product> productList = productRepository.findAllProductCategory(productType.getId(), Pageable.unpaged());
        productList.forEach(it -> {
          it.setProductType(null);
          productRepository.save(it);
        });
        productTypeRepository.delete(productType);
    }
}
