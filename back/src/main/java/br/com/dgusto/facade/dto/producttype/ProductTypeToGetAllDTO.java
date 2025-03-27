package br.com.dgusto.facade.dto.producttype;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductTypeToGetAllDTO implements Serializable {

    private Long id;

    private String name;
}
