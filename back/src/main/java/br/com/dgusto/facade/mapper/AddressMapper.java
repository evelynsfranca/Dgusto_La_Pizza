package br.com.dgusto.facade.mapper;

import org.mapstruct.Mapper;

import br.com.dgusto.domain.Address;
import br.com.dgusto.facade.dto.address.AddressDTO;
import br.com.dgusto.facade.dto.address.AddressToGetAllDTO;
import br.com.dgusto.facade.dto.address.AddressToGetDTO;
import br.com.dgusto.facade.dto.address.AddressToRequestSaveDTO;
import br.com.dgusto.facade.dto.address.AddressToSaveDTO;
import br.com.dgusto.facade.dto.address.AddressToUpdateDTO;

@Mapper(componentModel = "spring", uses = { ClientMapper.class })
public interface AddressMapper {

    AddressDTO toDto(Address entity);

    Address toSaveEntity(AddressToSaveDTO dto);

    Address toUpdateEntity(AddressToUpdateDTO dto);

    AddressToGetDTO toGetDto(Address entity);

    AddressToGetAllDTO toGetAllDto(Address entity);

    Address toRequestSaveEntity(AddressToRequestSaveDTO dto);
}
