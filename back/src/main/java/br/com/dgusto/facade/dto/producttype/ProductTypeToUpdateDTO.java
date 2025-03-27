package br.com.dgusto.facade.dto.producttype;

import java.io.Serializable;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductTypeToUpdateDTO implements Serializable {

    @NotNull
    private Long id;

    @NotBlank
    private String name;
}
