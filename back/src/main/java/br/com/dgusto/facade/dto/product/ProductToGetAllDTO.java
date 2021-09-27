package br.com.dgusto.facade.dto.product;

import br.com.dgusto.domain.enumeration.PizzaCategory;
import br.com.dgusto.domain.enumeration.ProductType;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class ProductToGetAllDTO implements Serializable {

    private Long id;

    private String name;

    private String description;

    private BigDecimal value;

    private ProductType productType;

    private PizzaCategory pizzaCategory;
}
