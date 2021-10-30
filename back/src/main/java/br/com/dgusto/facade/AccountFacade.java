package br.com.dgusto.facade;

import br.com.dgusto.domain.Authority;
import br.com.dgusto.domain.Client;
import br.com.dgusto.domain.User;
import br.com.dgusto.facade.dto.LoginDTO;
import br.com.dgusto.facade.dto.client.ClientDTO;
import br.com.dgusto.facade.dto.client.ClientToSaveDTO;
import br.com.dgusto.facade.dto.user.UserDTO;
import br.com.dgusto.facade.mapper.ClientMapper;
import br.com.dgusto.facade.mapper.UserMapper;
import br.com.dgusto.security.AuthoritiesConstants;
import br.com.dgusto.security.SecurityUtils;
import br.com.dgusto.service.AuthorityService;
import br.com.dgusto.service.ClientService;
import br.com.dgusto.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AccountFacade {

    private final AuthorityService authorityService;

    private final UserMapper userMapper;
    private final UserService userService;

    private final ClientMapper clientMapper;
    private final ClientService clientService;

    public AccountFacade(
        AuthorityService authorityService,
        UserMapper userMapper,
        UserService userService,
        ClientMapper clientMapper,
        ClientService clientService
    ) {
        this.authorityService = authorityService;
        this.userMapper = userMapper;
        this.userService = userService;
        this.clientMapper = clientMapper;
        this.clientService = clientService;
    }

    @Transactional
    public UserDTO login(LoginDTO dto) {
        BCryptPasswordEncoder crypt = new BCryptPasswordEncoder();
        User entity = userService.findByUsername(dto.getUsername());

        if(crypt.matches(dto.getPassword(), entity.getPassword())) {
           return userMapper.toDto(entity);
        } else {
            return null;
        }
    }

    @Transactional
    public ClientDTO clientSignup(ClientToSaveDTO dto) {

        if (!dto.getUser().getPassword().equals(dto.getUser().getPasswordConfirm())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password doesn't match");
        }

        Client entity = clientMapper.toSaveEntity(dto);

        Authority userAuthority =
            authorityService.findById(AuthoritiesConstants.USER);
        Authority clientAuthority =
            authorityService.findById(AuthoritiesConstants.CLIENT);
        entity.getUser().setAuthorities(Set.of(userAuthority, clientAuthority));

        User savedUser = userService.clientSignup(entity.getUser());
        entity.setUser(savedUser);

        Client savedClient = clientService.save(entity);

        return clientMapper.toDto(savedClient);
    }

    @Transactional(readOnly = true)
    public UserDTO getUserWithAuthorities() {
        Optional<User> optionalUser = userService.findOneByUsername(SecurityUtils.getCurrentUserLogin());

        User user = new User();

        if (optionalUser.isPresent()) {
            user = optionalUser.get();
            user.getAuthorities().size();
        }

        UserDTO userDTO = userMapper.toDto(user);

        userDTO.setAuthorities(SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet()));

        return userDTO;
    }
}
