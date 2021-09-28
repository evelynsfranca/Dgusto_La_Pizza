package br.com.dgusto.facade.admin;

import br.com.dgusto.domain.ProductCategory;
import br.com.dgusto.facade.dto.productcategory.ProductCategoryDTO;
import br.com.dgusto.facade.dto.productcategory.ProductCategoryToGetAllDTO;
import br.com.dgusto.facade.dto.productcategory.ProductCategoryToGetDTO;
import br.com.dgusto.facade.dto.productcategory.ProductCategoryToSaveDTO;
import br.com.dgusto.facade.dto.productcategory.ProductCategoryToUpdateDTO;
import br.com.dgusto.facade.mapper.ProductCategoryMapper;
import br.com.dgusto.service.ProductCategoryService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductCategoryAdminFacade {

    private final ProductCategoryService productCategoryService;
    private final ProductCategoryMapper productCategoryMapper;

    public ProductCategoryAdminFacade(
        ProductCategoryService productCategoryService,
        ProductCategoryMapper productCategoryMapper
    ) {
        this.productCategoryService = productCategoryService;
        this.productCategoryMapper = productCategoryMapper;
    }

    @Transactional
    public ProductCategoryDTO save(ProductCategoryToSaveDTO dto) {
        ProductCategory entity = productCategoryMapper.toSaveEntity(dto);
        ProductCategory saved = productCategoryService.save(entity);
        return productCategoryMapper.toDto(saved);
    }

    @Transactional
    public ProductCategoryDTO update(ProductCategoryToUpdateDTO dto) {
        ProductCategory entity = productCategoryMapper.toUpdateEntity(dto);
        ProductCategory updated = productCategoryService.update(entity);
        return productCategoryMapper.toDto(updated);
    }

    @Transactional(readOnly = true)
    public ProductCategoryToGetDTO get(Long id) {
        ProductCategory productCategory = productCategoryService.get(id);
        return productCategoryMapper.toGetDto(productCategory);
    }

    @Transactional(readOnly = true)
    public Page<ProductCategoryToGetAllDTO> getAll(Pageable pageable) {
        return productCategoryService.getAll(pageable)
            .map(productCategoryMapper::toGetAllDto);
    }

    @Transactional
    public void delete(Long productCategoryId) {
        productCategoryService.delete(productCategoryId);
    }
}
