package br.com.dgusto.facade.mapper;

import br.com.dgusto.domain.Request;
import br.com.dgusto.facade.dto.request.RequestDTO;
import br.com.dgusto.facade.dto.request.RequestToAdminUpdateDTO;
import br.com.dgusto.facade.dto.request.RequestToClientSaveDTO;
import br.com.dgusto.facade.dto.request.RequestToGetAllDTO;
import br.com.dgusto.facade.dto.request.RequestToGetDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(
    componentModel = "spring",
    unmappedTargetPolicy = ReportingPolicy.IGNORE,
    uses = { AddressMapper.class, ClientMapper.class, RequestItemMapper.class }
)
public interface RequestMapper {

    RequestDTO toDto(Request entity);

    Request toAdminUpdateEntity(RequestToAdminUpdateDTO dto);

    RequestToGetDTO toGetDto(Request entity);

    RequestToGetAllDTO toGetAllDto(Request entity);

    Request toClientSaveEntity(RequestToClientSaveDTO dto);
}
