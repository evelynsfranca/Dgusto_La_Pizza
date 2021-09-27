package br.com.dgusto.domain;

import br.com.dgusto.domain.enumeration.PhoneType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Entity
@Table(name = "phone")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class Phone implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "area_code")
    private String areaCode;

    @NotBlank
    @Column(name = "number")
    private String number;

    @NotBlank
    @Column(name = "type")
    private PhoneType type;

    @Column(name = "main_phone")
    @Builder.Default
    private Boolean mainPhone = true;

    @ManyToOne
    private Client client;
}
