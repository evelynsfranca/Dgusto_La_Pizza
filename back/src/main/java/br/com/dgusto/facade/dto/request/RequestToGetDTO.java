package br.com.dgusto.facade.dto.request;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import br.com.dgusto.domain.enumeration.PaymentMethod;
import br.com.dgusto.domain.enumeration.RequestStatus;
import br.com.dgusto.facade.dto.address.AddressDTO;
import br.com.dgusto.facade.dto.client.ClientToSimpleDTO;
import br.com.dgusto.facade.dto.requestitem.RequestItemDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    private List<RequestItemDTO> requestItems;
}
