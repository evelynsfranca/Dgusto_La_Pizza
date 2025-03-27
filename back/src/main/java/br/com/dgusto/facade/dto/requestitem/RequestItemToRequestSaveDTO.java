package br.com.dgusto.facade.dto.requestitem;

import br.com.dgusto.facade.dto.product.ProductToRequestSaveDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@NoArgsConstructor
public class RequestItemToRequestSaveDTO implements Serializable {

    @NotNull
    private Integer quantity;

    @Valid
    @NotNull
    private ProductToRequestSaveDTO product;
}
