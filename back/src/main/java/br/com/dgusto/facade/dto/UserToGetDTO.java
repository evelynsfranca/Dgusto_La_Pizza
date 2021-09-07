package br.com.dgusto.facade.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class UserToGetDTO implements Serializable {

    private Long id;

    private String name;

    private String email;
}
