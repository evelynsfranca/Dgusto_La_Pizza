package br.com.dgusto.facade.dto.phone;

import br.com.dgusto.domain.enumeration.PhoneType;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class PhoneToClientGetDTO implements Serializable {

    private Long id;

    private String areaCode;

    private String number;

    private PhoneType type;

    private Boolean mainPhone;
}
