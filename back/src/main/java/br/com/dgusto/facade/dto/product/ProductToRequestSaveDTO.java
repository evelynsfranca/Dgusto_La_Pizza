package br.com.dgusto.facade.dto.product;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@NoArgsConstructor
public class ProductToRequestSaveDTO implements Serializable {

    @NotNull
    private Long id;
}
