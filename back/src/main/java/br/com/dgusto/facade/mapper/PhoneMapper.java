package br.com.dgusto.facade.mapper;

import br.com.dgusto.domain.Phone;
import br.com.dgusto.facade.dto.phone.PhoneDTO;
import br.com.dgusto.facade.dto.phone.PhoneToGetAllDTO;
import br.com.dgusto.facade.dto.phone.PhoneToGetDTO;
import br.com.dgusto.facade.dto.phone.PhoneToSaveDTO;
import br.com.dgusto.facade.dto.phone.PhoneToUpdateDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(
    componentModel = "spring",
    unmappedTargetPolicy = ReportingPolicy.IGNORE,
    uses = { ClientMapper.class }
)
public interface PhoneMapper {

    PhoneDTO toDto(Phone entity);

    Phone toSaveEntity(PhoneToSaveDTO dto);

    Phone toUpdateEntity(PhoneToUpdateDTO dto);

    PhoneToGetDTO toGetDto(Phone entity);

    PhoneToGetAllDTO toGetAllDto(Phone entity);
}
