package br.com.dgusto.facade.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserToClientUpdateDTO implements Serializable {

    @NotNull
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String email;
}
