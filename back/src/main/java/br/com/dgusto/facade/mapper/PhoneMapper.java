package br.com.dgusto.facade.mapper;

import org.mapstruct.Mapper;

import br.com.dgusto.domain.Phone;
import br.com.dgusto.facade.dto.phone.PhoneDTO;
import br.com.dgusto.facade.dto.phone.PhoneToGetAllDTO;
import br.com.dgusto.facade.dto.phone.PhoneToGetDTO;
import br.com.dgusto.facade.dto.phone.PhoneToSaveDTO;
import br.com.dgusto.facade.dto.phone.PhoneToUpdateDTO;

@Mapper(componentModel = "spring", uses = { ClientMapper.class })
public interface PhoneMapper {

    PhoneDTO toDto(Phone entity);

    Phone toSaveEntity(PhoneToSaveDTO dto);

    Phone toUpdateEntity(PhoneToUpdateDTO dto);

    PhoneToGetDTO toGetDto(Phone entity);

    PhoneToGetAllDTO toGetAllDto(Phone entity);
}
