package br.com.dgusto.facade.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class SignUpDTO implements Serializable {

    private String name;

    private String email;

    private String username;

    private String password;
}
