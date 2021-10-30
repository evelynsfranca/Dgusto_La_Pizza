package br.com.dgusto.facade.dto.request;

import br.com.dgusto.domain.enumeration.PaymentMethod;
import br.com.dgusto.facade.dto.address.AddressToRequestSaveDTO;
import br.com.dgusto.facade.dto.client.ClientToRequestSaveDTO;
import br.com.dgusto.facade.dto.requestitem.RequestItemToRequestSaveDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
public class RequestToClientSaveDTO implements Serializable {

    @NotNull
    private PaymentMethod paymentMethod;

    private BigDecimal totalValue;

    @NotNull
    private Boolean delivery;

    private BigDecimal deliveryFee;

    @Valid
    @NotNull
    private ClientToRequestSaveDTO client;

    @Valid
    @NotNull
    private AddressToRequestSaveDTO address;

    @Valid
    @NotNull
    private List<RequestItemToRequestSaveDTO> requestItems;
}
