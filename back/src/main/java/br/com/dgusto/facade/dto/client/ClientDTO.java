package br.com.dgusto.facade.dto.client;

import br.com.dgusto.facade.dto.address.AddressDTO;
import br.com.dgusto.facade.dto.phone.PhoneDTO;
import br.com.dgusto.facade.dto.user.UserDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Set;

@Data
@NoArgsConstructor
public class ClientDTO implements Serializable {

    private Long id;

    private String cpf;

    private UserDTO user;

    private Set<AddressDTO> addresses;

    private Set<PhoneDTO> phones;
}
