package br.com.dgusto.facade.dto.address;

import java.io.Serializable;

import br.com.dgusto.facade.dto.client.ClientToSimpleDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AddressDTO implements Serializable {

    private Long id;

    private String zipCode;

    private String street;

    private String number;

    private String complement;

    private String neighborhood;

    private String city;

    private String state;

    private String country;

    private String reference;

    private Boolean mainAddress;

    private ClientToSimpleDTO client;
}
