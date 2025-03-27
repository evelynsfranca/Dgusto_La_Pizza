package br.com.dgusto.facade;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.dgusto.domain.Product;
import br.com.dgusto.facade.dto.product.ProductToGetAllDTO;
import br.com.dgusto.facade.dto.product.ProductToGetDTO;
import br.com.dgusto.facade.mapper.ProductMapper;
import br.com.dgusto.service.ProductService;

@Service
public class ProductFacade {

    private final ProductService productService;
    private final ProductMapper productMapper;

    public ProductFacade(
            ProductService productService,
            ProductMapper productMapper) {
        this.productService = productService;
        this.productMapper = productMapper;
    }

    @Transactional(readOnly = true)
    public ProductToGetDTO get(Long id) {
        Product product = productService.get(id);
        return productMapper.toGetDto(product);
    }

    @Transactional(readOnly = true)
    public Page<ProductToGetAllDTO> getAll(Pageable pageable) {
        return productService.getAll(pageable)
                .map(productMapper::toGetAllDto);
    }

    @Transactional(readOnly = true)
    public Page<ProductToGetAllDTO> getAllProductCategories(String categoryName, Pageable pageable) {
        return productService.findAllProductCategory(categoryName, pageable)
                .map(productMapper::toGetAllDto);
    }

    @Transactional(readOnly = true)
    public Page<ProductToGetAllDTO> getAllProductTypes(String typeName, Pageable pageable) {
        return productService.findAllProductType(typeName, pageable)
                .map(productMapper::toGetAllDto);
    }
}
