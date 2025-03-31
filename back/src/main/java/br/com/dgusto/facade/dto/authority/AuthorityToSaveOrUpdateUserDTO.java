package br.com.dgusto.facade.dto.authority;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
@NoArgsConstructor
public class AuthorityToSaveOrUpdateUserDTO implements Serializable {

    @NotBlank
    private String name;
}
