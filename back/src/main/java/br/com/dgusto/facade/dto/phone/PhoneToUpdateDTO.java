package br.com.dgusto.facade.dto.phone;

import java.io.Serializable;

import br.com.dgusto.domain.enumeration.PhoneType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PhoneToUpdateDTO implements Serializable {

    @NotNull
    private Long id;

    @NotBlank
    private String areaCode;

    @NotBlank
    private String number;

    @NotNull
    private PhoneType type;

    @NotNull
    private Boolean mainPhone;
}
