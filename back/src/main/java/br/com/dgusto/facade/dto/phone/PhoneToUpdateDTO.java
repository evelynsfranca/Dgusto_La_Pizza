package br.com.dgusto.facade.dto.phone;

import br.com.dgusto.domain.enumeration.PhoneType;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

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
