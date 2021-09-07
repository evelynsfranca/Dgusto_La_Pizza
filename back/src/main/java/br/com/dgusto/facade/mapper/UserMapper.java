package br.com.dgusto.facade.mapper;

import br.com.dgusto.domain.User;
import br.com.dgusto.facade.dto.*;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(
    componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface UserMapper {

    UserDTO toDto(User entity);

    User toSaveEntity(UserToSaveDTO dto);

    User toUpdateEntity(UserToUpdateDTO dto);

    UserToGetDTO toGetDto(User entity);

    UserToGetAllDTO toGetAllDto(User entity);

    User toLoginEntity(LoginDTO dto);
}
