package br.com.dgusto.domain;

import java.io.Serializable;

import br.com.dgusto.domain.enumeration.PhoneType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private PhoneType type;

    @Column(name = "main_phone")
    @Builder.Default
    private Boolean mainPhone = true;

    @ManyToOne
    private Client client;
}
