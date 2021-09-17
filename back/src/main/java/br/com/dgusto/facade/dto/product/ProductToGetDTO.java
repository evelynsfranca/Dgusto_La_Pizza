package br.com.dgusto.facade.dto.product;

import br.com.dgusto.domain.enumeration.ProductType;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class ProductToGetDTO implements Serializable {

    private Long id;

    private String name;

    private String description;

    private BigDecimal value;

    private Integer stockQuantity;

    private ProductType productType;
}
