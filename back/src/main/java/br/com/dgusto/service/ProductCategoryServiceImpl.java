package br.com.dgusto.service;

import br.com.dgusto.domain.Product;
import br.com.dgusto.domain.ProductCategory;
import br.com.dgusto.repository.ProductCategoryRepository;
import br.com.dgusto.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ProductCategoryServiceImpl implements ProductCategoryService {

  private final ProductCategoryRepository productCategoryRepository;
  private final ProductRepository productRepository;

    public ProductCategoryServiceImpl(
      ProductCategoryRepository productCategoryRepository, 
      ProductRepository productRepository
    ) {
        this.productCategoryRepository = productCategoryRepository;
      this.productRepository = productRepository;
    }

    @Override
    public ProductCategory save(ProductCategory productCategory) {
        return productCategoryRepository.save(productCategory);
    }

    @Override
    public ProductCategory update(ProductCategory productCategory) {
        return productCategoryRepository.findById(productCategory.getId())
            .map(it  -> {
                it.setName(productCategory.getName());
                return it;
            }).map(productCategoryRepository::save)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.productCategory.notFound"));
    }

    @Override
    public ProductCategory get(Long id) {
        return productCategoryRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.productCategory.notFound"));
    }

    @Override
    public Page<ProductCategory> getAll(Pageable pageable) {
        return productCategoryRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
        ProductCategory productCategory = productCategoryRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.productCategory.notFound"));
        Page<Product> productList = productRepository.findAllProductCategory(productCategory.getId(), Pageable.unpaged());
        productList.forEach(it -> {
          it.setProductCategory(null);
          productRepository.save(it);          
        });
        productCategoryRepository.delete(productCategory);
    }
}
