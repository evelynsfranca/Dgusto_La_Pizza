package br.com.dgusto.facade.dto.request;

import java.io.Serializable;

import br.com.dgusto.domain.enumeration.RequestStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RequestToEmployeeUpdateDTO implements Serializable {

    @NotNull
    private Long id;

    @NotNull
    private RequestStatus status;
}
