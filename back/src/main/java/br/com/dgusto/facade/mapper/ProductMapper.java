package br.com.dgusto.facade.mapper;

import br.com.dgusto.domain.Product;
import br.com.dgusto.facade.dto.product.*;
import br.com.dgusto.facade.dto.product.ProductToAdminGetAllDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(
    componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface ProductMapper {

    ProductDTO toDto(Product entity);

    Product toSaveEntity(ProductToSaveDTO dto);

    Product toUpdateEntity(ProductToUpdateDTO dto);

    ProductToGetDTO toGetDto(Product entity);

    ProductToGetAllDTO toGetAllDto(Product entity);

    ProductToAdminGetAllDTO toAdminGetAllDto(Product entity);
}
