package br.com.dgusto.service;

import br.com.dgusto.domain.Product;
import br.com.dgusto.domain.ProductCategory;
import br.com.dgusto.domain.ProductType;
import br.com.dgusto.repository.ProductCategoryRepository;
import br.com.dgusto.repository.ProductRepository;
import br.com.dgusto.repository.ProductTypeRepository;
import br.com.dgusto.security.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final ProductTypeRepository productTypeRepository;

    public ProductServiceImpl(
        ProductRepository productRepository,
        ProductCategoryRepository productCategoryRepository,
        ProductTypeRepository productTypeRepository
    ) {
        this.productRepository = productRepository;
        this.productCategoryRepository = productCategoryRepository;
        this.productTypeRepository = productTypeRepository;
    }

    @Override
    public Product save(Product product) {
        String userLogin = SecurityUtils.getCurrentUserLogin();
        product.setCreatedBy(userLogin);
        product.setCreatedDate(LocalDateTime.now());
        return productRepository.save(product);
    }

    @Override
    public Product update(Product product) {
        String userLogin = SecurityUtils.getCurrentUserLogin();

        return productRepository.findById(product.getId())
            .map(it  -> {
                it.setName(product.getName());
                it.setUnitValue(product.getUnitValue());
                it.setDescription(product.getDescription());
                it.setProductType(product.getProductType());
                it.setProductCategory(product.getProductCategory());
                it.setStockQuantity(product.getStockQuantity());
                it.setCreatedBy(userLogin);
                it.setCreatedDate(LocalDateTime.now());
                return it;
            }).map(productRepository::save)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.product.notFound"));
    }

    @Override
    public Product get(Long id) {
        return productRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.product.notFound"));
    }

    @Override
    public Page<Product> getAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Page<Product> findAllProductCategory(String categoryName, Pageable pageable) {
        ProductCategory category = productCategoryRepository.findByName(categoryName).orElseThrow();
        return productRepository.findAllProductCategory(category.getId(), pageable);
    }

    @Override
    public Page<Product> findAllProductType(String typeName, Pageable pageable) {
        ProductType type = productTypeRepository.findByName(typeName).orElseThrow();
        return productRepository.findAllProductTypes(type.getId(), pageable);
    }

    @Override
    public void delete(Long id) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.product.notFound"));
        productRepository.delete(product);
    }
}
