package br.com.dgusto.facade.dto.producttype;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@NoArgsConstructor
public class ProductTypeIdDTO implements Serializable {

    @NotNull
    private Long id;
}
