package br.com.dgusto.service;

import br.com.dgusto.domain.ProductType;
import br.com.dgusto.repository.ProductTypeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductTypeServiceImpl implements ProductTypeService {

    private final ProductTypeRepository productTypeRepository;

    public ProductTypeServiceImpl(
        ProductTypeRepository productTypeRepository
    ) {
        this.productTypeRepository = productTypeRepository;
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
            .orElseThrow();
    }

    @Override
    public ProductType get(Long id) {
        return productTypeRepository.findById(id)
            .orElseThrow();
    }

    @Override
    public Page<ProductType> getAll(Pageable pageable) {
        return productTypeRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
        ProductType productType = productTypeRepository.findById(id)
            .orElseThrow();
        productTypeRepository.delete(productType);
    }
}
