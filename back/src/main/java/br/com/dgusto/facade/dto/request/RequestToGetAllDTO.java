package br.com.dgusto.facade.dto.request;

import br.com.dgusto.domain.enumeration.RequestStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class RequestToGetAllDTO implements Serializable {

    private Long id;

    private String orderNumber;

    private LocalDateTime orderDate;

    private RequestStatus status;

    private BigDecimal totalValue;

    private Boolean delivery;
}
