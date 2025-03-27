package br.com.dgusto.facade.dto.product;

import java.io.Serializable;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductToRequestSaveDTO implements Serializable {

    @NotNull
    private Long id;
}
