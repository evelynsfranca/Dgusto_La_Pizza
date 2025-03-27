package br.com.dgusto.facade.dto.client;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ClientToSimpleDTO implements Serializable {

    private Long id;

    private String name;
}
