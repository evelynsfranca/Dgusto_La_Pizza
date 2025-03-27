package br.com.dgusto.facade.dto.product;

import java.io.Serializable;
import java.math.BigDecimal;

import br.com.dgusto.facade.dto.productcategory.ProductCategoryIdDTO;
import br.com.dgusto.facade.dto.producttype.ProductTypeIdDTO;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductToSaveDTO implements Serializable {

    private Long id;

    @NotBlank
    private String name;

    private String description;

    @NotNull
    private BigDecimal unitValue;

    @NotNull
    private Integer stockQuantity;

    @NotNull
    private ProductTypeIdDTO productType;

    private ProductCategoryIdDTO productCategory;

}
