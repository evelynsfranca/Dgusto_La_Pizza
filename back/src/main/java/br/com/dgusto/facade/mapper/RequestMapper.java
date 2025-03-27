package br.com.dgusto.facade.mapper;

import org.mapstruct.Mapper;

import br.com.dgusto.domain.Request;
import br.com.dgusto.facade.dto.request.RequestDTO;
import br.com.dgusto.facade.dto.request.RequestToAdminUpdateDTO;
import br.com.dgusto.facade.dto.request.RequestToClientSaveDTO;
import br.com.dgusto.facade.dto.request.RequestToEmployeeUpdateDTO;
import br.com.dgusto.facade.dto.request.RequestToGetAllDTO;
import br.com.dgusto.facade.dto.request.RequestToGetDTO;

@Mapper(componentModel = "spring", uses = { AddressMapper.class, ClientMapper.class, RequestItemMapper.class })
public interface RequestMapper {

    RequestDTO toDto(Request entity);

    Request toAdminUpdateEntity(RequestToAdminUpdateDTO dto);

    Request toEmployeeUpdateEntity(RequestToEmployeeUpdateDTO dto);

    RequestToGetDTO toGetDto(Request entity);

    RequestToGetAllDTO toGetAllDto(Request entity);

    Request toClientSaveEntity(RequestToClientSaveDTO dto);
}
