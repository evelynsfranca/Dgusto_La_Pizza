package br.com.dgusto.facade.mapper;

import br.com.dgusto.domain.Authority;
import br.com.dgusto.domain.User;
import br.com.dgusto.facade.dto.user.UserDTO;
import br.com.dgusto.facade.dto.user.UserToGetAllDTO;
import br.com.dgusto.facade.dto.user.UserToGetDTO;
import br.com.dgusto.facade.dto.user.UserToSaveDTO;
import br.com.dgusto.facade.dto.user.UserToUpdateDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.Set;
import java.util.stream.Collectors;

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

    default Set<String> stringsFromAuthorities(Set<Authority> authorities) {
        return authorities.stream().map(Authority::getName)
                .collect(Collectors.toSet());
    }

    default Set<Authority> authoritiesFromStrings(Set<String> strings) {
        return strings.stream().map(string -> {
            Authority auth = new Authority();
            auth.setName(string);
            return auth;
        }).collect(Collectors.toSet());
    }
}
