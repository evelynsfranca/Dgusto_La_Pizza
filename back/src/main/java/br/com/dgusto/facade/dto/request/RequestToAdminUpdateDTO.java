package br.com.dgusto.facade.dto.request;

import br.com.dgusto.domain.enumeration.RequestStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@NoArgsConstructor
public class RequestToAdminUpdateDTO implements Serializable {

    @NotNull
    private Long id;

    @NotNull
    private RequestStatus status;
}
