package br.com.dgusto.facade.dto.client;

import java.io.Serializable;
import java.util.Set;

import br.com.dgusto.facade.dto.address.AddressToClientGetDTO;
import br.com.dgusto.facade.dto.phone.PhoneToClientGetDTO;
import br.com.dgusto.facade.dto.user.UserToClientGetDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ClientToGetDTO implements Serializable {

    private Long id;

    private String cpf;

    private UserToClientGetDTO user;

    private Set<AddressToClientGetDTO> addresses;

    private Set<PhoneToClientGetDTO> phones;
}
