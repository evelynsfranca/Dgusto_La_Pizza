package br.com.dgusto.facade.dto.user;

import br.com.dgusto.facade.dto.authority.AuthorityToSaveOrUpdateUserDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Set;

@Data
@NoArgsConstructor
public class UserToSaveDTO implements Serializable {

    private String name;

    private String email;

    private String username;

    private String password;

    private Set<AuthorityToSaveOrUpdateUserDTO> authorities;
}
