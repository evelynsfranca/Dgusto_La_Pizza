package br.com.dgusto.facade.dto.requestitem;

import br.com.dgusto.facade.dto.product.ProductDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@NoArgsConstructor
public class RequestItemDTO implements Serializable {

    @NotNull
    private Integer quantity;

    @Valid
    @NotNull
    private ProductDTO product;
}
