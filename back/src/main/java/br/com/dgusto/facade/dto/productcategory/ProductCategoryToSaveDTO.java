package br.com.dgusto.facade.dto.productcategory;

import java.io.Serializable;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductCategoryToSaveDTO implements Serializable {

    @NotBlank
    private String name;
}
