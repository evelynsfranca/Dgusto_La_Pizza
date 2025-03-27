package br.com.dgusto.facade.dto.user;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserToClientGetDTO implements Serializable {

    private Long id;

    private String name;

    private String email;
}
