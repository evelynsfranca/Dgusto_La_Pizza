package br.com.dgusto.facade.dto.client;

import br.com.dgusto.facade.dto.user.UserToClientUpdateDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@NoArgsConstructor
public class ClientToUpdateDTO implements Serializable {

    @NotNull
    private Long id;

    @NotBlank
    private String cpf;

    @Valid
    @NotNull
    private UserToClientUpdateDTO user;
}
