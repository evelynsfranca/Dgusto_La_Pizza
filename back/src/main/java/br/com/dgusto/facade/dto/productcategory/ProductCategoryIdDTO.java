package br.com.dgusto.facade.dto.productcategory;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@NoArgsConstructor
public class ProductCategoryIdDTO implements Serializable {

    @NotNull
    private Long id;
}
