package br.com.dgusto.domain;

import br.com.dgusto.domain.enumeration.OrderStatus;
import br.com.dgusto.domain.enumeration.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
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
    private OrderStatus status;

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
}
