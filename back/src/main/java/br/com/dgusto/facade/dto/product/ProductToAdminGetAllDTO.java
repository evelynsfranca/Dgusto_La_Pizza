package br.com.dgusto.facade.dto.product;

import java.io.Serializable;
import java.math.BigDecimal;

import br.com.dgusto.facade.dto.productcategory.ProductCategoryDTO;
import br.com.dgusto.facade.dto.producttype.ProductTypeDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductToAdminGetAllDTO implements Serializable {

    private Long id;

    private String name;

    private BigDecimal unitValue;

    private Integer stockQuantity;

    private ProductTypeDTO productType;

    private ProductCategoryDTO productCategory;
}
