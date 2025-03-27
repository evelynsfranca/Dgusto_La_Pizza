package br.com.dgusto.facade.dto.productcategory;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductCategoryToGetAllDTO implements Serializable {

    private Long id;

    private String name;
}
