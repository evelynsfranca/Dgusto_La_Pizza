package br.com.dgusto.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Set;

@Entity
@Table(name = "request")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Request implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "delivery_fee")
    private BigDecimal deliveryFee;

    @NotNull
    @Column(name = "total")
    private BigDecimal total;

    @ManyToOne
    private Client client;

    @OneToMany(mappedBy = "request")
    private Set<RequestProduct> requests;
}
