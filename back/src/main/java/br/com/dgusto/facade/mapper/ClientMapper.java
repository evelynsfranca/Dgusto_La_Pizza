package br.com.dgusto.facade.mapper;

import br.com.dgusto.domain.Client;
import br.com.dgusto.facade.dto.client.ClientToSimpleDTO;
import br.com.dgusto.facade.dto.client.ClientDTO;
import br.com.dgusto.facade.dto.client.ClientToGetDTO;
import br.com.dgusto.facade.dto.client.ClientToSaveDTO;
import br.com.dgusto.facade.dto.client.ClientToUpdateDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(
    componentModel = "spring",
    unmappedTargetPolicy = ReportingPolicy.IGNORE,
    uses = { PhoneMapper.class, AddressMapper.class, UserMapper.class }
)
public interface ClientMapper {

    ClientDTO toDto(Client entity);

    ClientToSimpleDTO toSimpleDto(Client entity);

    Client toSaveEntity(ClientToSaveDTO dto);

    Client toUpdateEntity(ClientToUpdateDTO dto);

    ClientToGetDTO toGetDto(Client entity);
}
