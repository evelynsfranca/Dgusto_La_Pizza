package br.com.dgusto.facade.dto.productcategory;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
@NoArgsConstructor
public class ProductCategoryToSaveDTO implements Serializable {

    @NotBlank
    private String name;
}
