package br.com.dgusto.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

import br.com.dgusto.domain.enumeration.PaymentMethod;
import br.com.dgusto.domain.enumeration.RequestStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @NotBlank
    @Column(name = "order_number", length = 45)
    private String orderNumber;

    @NotNull
    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @Column(name = "delivery_fee")
    private BigDecimal deliveryFee;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 45)
    private RequestStatus status;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", length = 45)
    private PaymentMethod paymentMethod;

    @NotNull
    @Column(name = "total_value")
    private BigDecimal totalValue;

    @NotNull
    @Column(name = "delivery")
    private Boolean delivery;

    @ManyToOne(optional = false)
    private Client client;

    @ManyToOne
    private Address address;

    @OneToMany(mappedBy = "request")
    private Set<RequestItem> requestItems;
}
