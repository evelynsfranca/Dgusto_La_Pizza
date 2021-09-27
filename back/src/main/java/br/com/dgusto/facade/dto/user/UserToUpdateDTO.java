package br.com.dgusto.facade.dto.user;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@NoArgsConstructor
public class UserToUpdateDTO implements Serializable {

    @NotNull
    private Long id;

    private String name;

    private String email;

    private String password;
}
