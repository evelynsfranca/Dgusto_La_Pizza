package br.com.dgusto.facade.dto.user;

import br.com.dgusto.facade.dto.authority.AuthorityToSaveOrUpdateUserDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Set;

@Data
@NoArgsConstructor
public class UserToUpdateDTO implements Serializable {

    @NotNull
    private Long id;

    private String name;

    private String email;

    private String password;

    private Set<AuthorityToSaveOrUpdateUserDTO> authorities;
}
