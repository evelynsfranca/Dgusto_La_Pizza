package br.com.dgusto.facade.dto.client;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class ClientSimpleDTO implements Serializable {

    private Long id;

    private String name;
}
