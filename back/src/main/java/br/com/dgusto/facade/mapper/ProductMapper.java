package br.com.dgusto.facade.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import br.com.dgusto.domain.Product;
import br.com.dgusto.facade.dto.product.ProductDTO;
import br.com.dgusto.facade.dto.product.ProductToAdminGetAllDTO;
import br.com.dgusto.facade.dto.product.ProductToGetAllDTO;
import br.com.dgusto.facade.dto.product.ProductToGetDTO;
import br.com.dgusto.facade.dto.product.ProductToRequestSaveDTO;
import br.com.dgusto.facade.dto.product.ProductToSaveDTO;
import br.com.dgusto.facade.dto.product.ProductToUpdateDTO;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {

    ProductDTO toDto(Product entity);

    Product toSaveEntity(ProductToSaveDTO dto);

    Product toUpdateEntity(ProductToUpdateDTO dto);

    ProductToGetDTO toGetDto(Product entity);

    ProductToGetAllDTO toGetAllDto(Product entity);

    ProductToAdminGetAllDTO toAdminGetAllDto(Product entity);

    Product toRequestSaveEntity(ProductToRequestSaveDTO dto);
}
