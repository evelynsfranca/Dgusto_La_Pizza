package br.com.dgusto.facade.dto.user;

import java.io.Serializable;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
