package br.com.dgusto.facade.dto.client;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@NoArgsConstructor
public class ClientToRequestSaveDTO implements Serializable {

    @NotNull
    private Long id;
}
