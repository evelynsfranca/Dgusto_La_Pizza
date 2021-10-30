package br.com.dgusto.facade.dto.request;

import br.com.dgusto.domain.enumeration.RequestStatus;
import br.com.dgusto.domain.enumeration.PaymentMethod;
import br.com.dgusto.facade.dto.address.AddressDTO;
import br.com.dgusto.facade.dto.client.ClientToSimpleDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class RequestToGetDTO implements Serializable {

    private Long id;

    private String orderNumber;

    private LocalDateTime orderDate;

    private BigDecimal deliveryFee;

    private RequestStatus status;

    private PaymentMethod paymentMethod;

    private BigDecimal totalValue;

    private Boolean delivery;

    private ClientToSimpleDTO client;

    private AddressDTO address;
}
