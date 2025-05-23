package br.com.dgusto.facade.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import br.com.dgusto.domain.RequestItem;
import br.com.dgusto.facade.dto.requestitem.RequestItemToRequestSaveDTO;

@Mapper(componentModel = "spring", uses = { RequestMapper.class,
        ProductMapper.class }, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RequestItemMapper {

    RequestItem toRequestSaveEntity(RequestItemToRequestSaveDTO dto);
}
