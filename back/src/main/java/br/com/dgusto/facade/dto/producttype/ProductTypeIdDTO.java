package br.com.dgusto.facade.dto.producttype;

import java.io.Serializable;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductTypeIdDTO implements Serializable {

    @NotNull
    private Long id;
}
