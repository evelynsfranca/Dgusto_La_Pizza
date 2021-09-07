package br.com.dgusto.facade.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class UserToSaveDTO implements Serializable {

    private String name;

    private String email;

    private String password;    

}
