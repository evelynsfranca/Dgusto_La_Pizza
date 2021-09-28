package br.com.dgusto.facade.dto.producttype;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
@NoArgsConstructor
public class ProductTypeDTO implements Serializable {

    private Long id;

    private String name;
}
