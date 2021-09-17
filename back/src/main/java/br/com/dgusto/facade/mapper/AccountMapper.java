package br.com.dgusto.facade.mapper;

import br.com.dgusto.domain.Authority;
import br.com.dgusto.domain.User;
import br.com.dgusto.facade.dto.LoginDTO;
import br.com.dgusto.facade.dto.SignupDTO;
import br.com.dgusto.facade.dto.user.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(
    componentModel = "spring",
    unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface AccountMapper {

    UserDTO toDto(User entity);
    User toLoginEntity(LoginDTO dto);

    SignupDTO toSignupDto(User user);

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
