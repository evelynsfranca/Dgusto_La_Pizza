package br.com.dgusto.facade.mapper;

import br.com.dgusto.domain.Client;
import br.com.dgusto.facade.dto.client.ClientSimpleDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(
    componentModel = "spring",
    unmappedTargetPolicy = ReportingPolicy.IGNORE,
    uses = { PhoneMapper.class, AddressMapper.class }
)
public interface ClientMapper {

    @Mapping(source = "user.name", target = "name")
    ClientSimpleDTO toSimpleDto(Client entity);
}
