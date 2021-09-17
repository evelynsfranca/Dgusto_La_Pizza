package br.com.dgusto.facade.dto.product;

import br.com.dgusto.domain.enumeration.ProductType;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class ProductDTO implements Serializable {

    private Long id;

    private String name;

    private String description;

    private BigDecimal value;

    private Integer stockQuantity;

    private ProductType productType;
}
