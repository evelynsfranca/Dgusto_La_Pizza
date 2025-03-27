package br.com.dgusto.facade.dto.user;

import java.io.Serializable;
import java.util.Set;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserToGetAllDTO implements Serializable {

    private Long id;

    private String name;

    private String email;

    private Set<String> authorities;
}
