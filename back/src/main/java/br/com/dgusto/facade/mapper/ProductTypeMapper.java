package br.com.dgusto.facade.mapper;

import br.com.dgusto.domain.ProductType;
import br.com.dgusto.facade.dto.producttype.ProductTypeDTO;
import br.com.dgusto.facade.dto.producttype.ProductTypeToGetAllDTO;
import br.com.dgusto.facade.dto.producttype.ProductTypeToGetDTO;
import br.com.dgusto.facade.dto.producttype.ProductTypeToSaveDTO;
import br.com.dgusto.facade.dto.producttype.ProductTypeToUpdateDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(
    componentModel = "spring",
    unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface ProductTypeMapper {

    ProductTypeDTO toDto(ProductType entity);

    ProductType toSaveEntity(ProductTypeToSaveDTO dto);

    ProductType toUpdateEntity(ProductTypeToUpdateDTO dto);

    ProductTypeToGetDTO toGetDto(ProductType entity);

    ProductTypeToGetAllDTO toGetAllDto(ProductType entity);
}
