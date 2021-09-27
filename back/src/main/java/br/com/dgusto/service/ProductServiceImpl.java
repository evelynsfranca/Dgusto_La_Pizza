package br.com.dgusto.service;

import br.com.dgusto.domain.Product;
import br.com.dgusto.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product update(Product product) {
        return productRepository.findById(product.getId())
            .map(it  -> {
                it.setName(product.getName());
                it.setValue(product.getValue());
                it.setDescription(product.getDescription());
                it.setProductType(product.getProductType());
                it.setStockQuantity(product.getStockQuantity());
                return it;
            }).map(productRepository::save)
            .orElseThrow();
    }

    @Override
    public Product get(Long id) {
        return productRepository.findById(id)
            .orElseThrow();
    }

    @Override
    public Page<Product> getAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Page<Product> findAllPizzaFlavors(Pageable pageable) {
        return productRepository.findAllPizzaFlavors(pageable);
    }

    @Override
    public Page<Product> findAllPizzaSizes(Pageable pageable) {
        return productRepository.findAllPizzaSizes(pageable);
    }

    @Override
    public Page<Product> findAllDrinks(Pageable pageable) {
        return productRepository.findAllDrinks(pageable);
    }

    @Override
    public Page<Product> findAllOthers(Pageable pageable) {
        return productRepository.findAllOthers(pageable);
    }

    @Override
    public void delete(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow();
        productRepository.delete(product);
    }
}
