package br.com.dgusto.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "client")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Client implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "cpf")
    private String cpf;

    @NotNull
    @OneToOne
    private User user;

    @OneToMany(mappedBy = "client")
    private Set<Address> addresses;

    @OneToMany(mappedBy = "client")
    private Set<Phone> phones;

    @OneToMany(mappedBy = "client")
    private Set<Request> requests;
}
