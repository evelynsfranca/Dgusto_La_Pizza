package br.com.dgusto.facade.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserToClientGetDTO implements Serializable {

    private Long id;

    private String name;

    private String email;
}
