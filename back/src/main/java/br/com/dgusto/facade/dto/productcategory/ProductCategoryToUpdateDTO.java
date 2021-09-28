package br.com.dgusto.facade.dto.productcategory;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@NoArgsConstructor
public class ProductCategoryToUpdateDTO implements Serializable {

    @NotNull
    private Long id;

    @NotBlank
    private String name;
}
