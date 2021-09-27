package br.com.dgusto.facade.admin;

import br.com.dgusto.domain.Product;
import br.com.dgusto.facade.dto.product.ProductDTO;
import br.com.dgusto.facade.dto.product.ProductToAdminGetAllDTO;
import br.com.dgusto.facade.dto.product.ProductToGetDTO;
import br.com.dgusto.facade.dto.product.ProductToSaveDTO;
import br.com.dgusto.facade.dto.product.ProductToUpdateDTO;
import br.com.dgusto.facade.mapper.ProductMapper;
import br.com.dgusto.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductAdminFacade {

    private final ProductService productService;
    private final ProductMapper productMapper;

    public ProductAdminFacade(
        ProductService productService,
        ProductMapper productMapper
    ) {
        this.productService = productService;
        this.productMapper = productMapper;
    }

    @Transactional
    public ProductDTO save(ProductToSaveDTO dto) {
        Product entity = productMapper.toSaveEntity(dto);
        Product saved = productService.save(entity);
        return productMapper.toDto(saved);
    }

    @Transactional
    public ProductDTO update(ProductToUpdateDTO dto) {
        Product entity = productMapper.toUpdateEntity(dto);
        Product saved = productService.update(entity);
        return productMapper.toDto(saved);
    }

    @Transactional(readOnly = true)
    public ProductToGetDTO get(Long id) {
        Product product = productService.get(id);
        return productMapper.toGetDto(product);
    }

    @Transactional(readOnly = true)
    public Page<ProductToAdminGetAllDTO> getAll(Pageable pageable) {
        return productService.getAll(pageable)
            .map(productMapper::toAdminGetAllDto);
    }

    @Transactional(readOnly = true)
    public Page<ProductToAdminGetAllDTO> getAllPizzaFlavors(Pageable pageable) {
        return productService.findAllPizzaFlavors(pageable)
                .map(productMapper::toAdminGetAllDto);
    }

    @Transactional(readOnly = true)
    public Page<ProductToAdminGetAllDTO> getAllPizzaSizes(Pageable pageable) {
        return productService.findAllPizzaSizes(pageable)
                .map(productMapper::toAdminGetAllDto);
    }

    @Transactional(readOnly = true)
    public Page<ProductToAdminGetAllDTO> getAllDrinks(Pageable pageable) {
        return productService.findAllDrinks(pageable)
                .map(productMapper::toAdminGetAllDto);
    }

    @Transactional(readOnly = true)
    public Page<ProductToAdminGetAllDTO> getAllOthers(Pageable pageable) {
        return productService.findAllOthers(pageable)
                .map(productMapper::toAdminGetAllDto);
    }

    @Transactional
    public void delete(Long id) {
        productService.delete(id);
    }
}
