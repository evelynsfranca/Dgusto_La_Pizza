package br.com.dgusto.facade.dto.address;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AddressToGetAllDTO implements Serializable {

    private Long id;

    private String zipCode;

    private String street;

    private String number;

    private String complement;

    private String neighborhood;

    private String city;

    private String state;

    private Boolean mainAddress;
}
