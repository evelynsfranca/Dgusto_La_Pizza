package br.com.dgusto.facade.dto.client;

import java.io.Serializable;

import br.com.dgusto.facade.dto.user.UserToClientUpdateDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

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
