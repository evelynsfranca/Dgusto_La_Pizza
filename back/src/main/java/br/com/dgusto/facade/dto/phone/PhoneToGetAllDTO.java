package br.com.dgusto.facade.dto.phone;

import java.io.Serializable;

import br.com.dgusto.domain.enumeration.PhoneType;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PhoneToGetAllDTO implements Serializable {

    private Long id;

    private String areaCode;

    private String number;

    private PhoneType type;

    private Boolean mainPhone;
}
