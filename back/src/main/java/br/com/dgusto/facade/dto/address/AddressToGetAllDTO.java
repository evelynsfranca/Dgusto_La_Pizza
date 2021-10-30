package br.com.dgusto.facade.dto.address;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

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

    private String country;

    private String reference;

    private Boolean mainAddress;
}
