package br.com.dgusto.facade.dto.product;

import br.com.dgusto.facade.dto.productcategory.ProductCategoryIdDTO;
import br.com.dgusto.facade.dto.producttype.ProductTypeIdDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;

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
