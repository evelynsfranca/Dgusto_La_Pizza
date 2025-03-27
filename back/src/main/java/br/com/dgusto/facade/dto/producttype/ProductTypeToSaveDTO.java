package br.com.dgusto.facade.dto.producttype;

import java.io.Serializable;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductTypeToSaveDTO implements Serializable {

    @NotBlank
    private String name;
}
