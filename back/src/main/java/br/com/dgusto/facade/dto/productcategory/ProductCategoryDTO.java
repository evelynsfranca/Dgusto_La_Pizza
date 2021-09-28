package br.com.dgusto.facade.dto.productcategory;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class ProductCategoryDTO implements Serializable {

    private Long id;

    private String name;
}
