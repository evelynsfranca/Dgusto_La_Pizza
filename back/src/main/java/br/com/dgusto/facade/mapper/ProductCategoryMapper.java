package br.com.dgusto.facade.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import br.com.dgusto.domain.ProductCategory;
import br.com.dgusto.facade.dto.productcategory.ProductCategoryDTO;
import br.com.dgusto.facade.dto.productcategory.ProductCategoryToGetAllDTO;
import br.com.dgusto.facade.dto.productcategory.ProductCategoryToGetDTO;
import br.com.dgusto.facade.dto.productcategory.ProductCategoryToSaveDTO;
import br.com.dgusto.facade.dto.productcategory.ProductCategoryToUpdateDTO;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductCategoryMapper {

    ProductCategoryDTO toDto(ProductCategory entity);

    ProductCategory toSaveEntity(ProductCategoryToSaveDTO dto);

    ProductCategory toUpdateEntity(ProductCategoryToUpdateDTO dto);

    ProductCategoryToGetDTO toGetDto(ProductCategory entity);

    ProductCategoryToGetAllDTO toGetAllDto(ProductCategory entity);
}
