package br.com.dgusto.facade.admin;

import br.com.dgusto.domain.ProductType;
import br.com.dgusto.facade.dto.producttype.ProductTypeDTO;
import br.com.dgusto.facade.dto.producttype.ProductTypeToGetAllDTO;
import br.com.dgusto.facade.dto.producttype.ProductTypeToGetDTO;
import br.com.dgusto.facade.dto.producttype.ProductTypeToSaveDTO;
import br.com.dgusto.facade.dto.producttype.ProductTypeToUpdateDTO;
import br.com.dgusto.facade.mapper.ProductTypeMapper;
import br.com.dgusto.service.ProductTypeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductTypeAdminFacade {

    private final ProductTypeService productTypeService;
    private final ProductTypeMapper productTypeMapper;

    public ProductTypeAdminFacade(
        ProductTypeService productTypeService,
        ProductTypeMapper productTypeMapper
    ) {
        this.productTypeService = productTypeService;
        this.productTypeMapper = productTypeMapper;
    }

    @Transactional
    public ProductTypeDTO save(ProductTypeToSaveDTO dto) {
        ProductType entity = productTypeMapper.toSaveEntity(dto);
        ProductType saved = productTypeService.save(entity);
        return productTypeMapper.toDto(saved);
    }

    @Transactional
    public ProductTypeDTO update(ProductTypeToUpdateDTO dto) {
        ProductType entity = productTypeMapper.toUpdateEntity(dto);
        ProductType updated = productTypeService.update(entity);
        return productTypeMapper.toDto(updated);
    }

    @Transactional(readOnly = true)
    public ProductTypeToGetDTO get(Long id) {
        ProductType productType = productTypeService.get(id);
        return productTypeMapper.toGetDto(productType);
    }

    @Transactional(readOnly = true)
    public Page<ProductTypeToGetAllDTO> getAll(Pageable pageable) {
        return productTypeService.getAll(pageable)
            .map(productTypeMapper::toGetAllDto);
    }

    @Transactional
    public void delete(Long productTypeId) {
        productTypeService.delete(productTypeId);
    }
}
