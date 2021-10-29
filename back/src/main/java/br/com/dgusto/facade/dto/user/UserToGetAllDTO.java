package br.com.dgusto.facade.dto.user;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Set;

@Data
@NoArgsConstructor
public class UserToGetAllDTO implements Serializable {

    private Long id;

    private String name;

    private String email;

    private Set<String> authorities;
}
