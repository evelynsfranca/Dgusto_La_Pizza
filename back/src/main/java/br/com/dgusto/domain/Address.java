package br.com.dgusto.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Entity
@Table(name = "address")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class Address implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "zip_code")
    private String zipCode;

    @NotBlank
    @Column(name = "street")
    private String street;

    @NotBlank
    @Column(name = "number")
    private String number;

    @NotBlank
    @Column(name = "complement")
    private String complement;

    @NotBlank
    @Column(name = "neighborhood")
    private String neighborhood;

    @NotBlank
    @Column(name = "city")
    private String city;

    @NotBlank
    @Column(name = "state")
    private String state;

    @NotBlank
    @Column(name = "country")
    private String country;

    @Column(name = "reference")
    private String reference;

    @Column(name = "main_address")
    @Builder.Default
    private Boolean mainAddress = true;

    @ManyToOne
    private Client client;
}
