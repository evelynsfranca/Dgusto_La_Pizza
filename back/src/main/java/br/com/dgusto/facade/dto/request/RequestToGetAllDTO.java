package br.com.dgusto.facade.dto.request;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import br.com.dgusto.domain.enumeration.RequestStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

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
