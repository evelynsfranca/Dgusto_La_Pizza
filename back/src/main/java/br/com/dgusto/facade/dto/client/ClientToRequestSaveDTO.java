package br.com.dgusto.facade.dto.client;

import java.io.Serializable;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ClientToRequestSaveDTO implements Serializable {

    @NotNull
    private Long id;
}
