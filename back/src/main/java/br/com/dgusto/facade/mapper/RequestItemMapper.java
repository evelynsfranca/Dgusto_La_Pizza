package br.com.dgusto.facade.mapper;

import br.com.dgusto.domain.RequestItem;
import br.com.dgusto.facade.dto.requestitem.RequestItemToRequestSaveDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(
    componentModel = "spring",
    unmappedTargetPolicy = ReportingPolicy.IGNORE,
    uses = { RequestMapper.class, ProductMapper.class }
)
public interface RequestItemMapper {

    RequestItem toRequestSaveEntity(RequestItemToRequestSaveDTO dto);
}
