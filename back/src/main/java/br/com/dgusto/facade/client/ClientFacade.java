package br.com.dgusto.facade.client;

import br.com.dgusto.domain.Client;
import br.com.dgusto.domain.User;
import br.com.dgusto.facade.dto.client.ClientDTO;
import br.com.dgusto.facade.dto.client.ClientToGetDTO;
import br.com.dgusto.facade.dto.client.ClientToUpdateDTO;
import br.com.dgusto.facade.mapper.ClientMapper;
import br.com.dgusto.security.SecurityUtils;
import br.com.dgusto.service.ClientService;
import br.com.dgusto.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ClientFacade {

    private final ClientService clientService;
    private final ClientMapper clientMapper;

    private final UserService userService;

    public ClientFacade(
        ClientService clientService,
        ClientMapper clientMapper,
        UserService userService
    ) {
        this.clientService = clientService;
        this.clientMapper = clientMapper;
        this.userService = userService;
    }

    @Transactional
    public ClientDTO update(ClientToUpdateDTO dto) {
        Client entity = clientMapper.toUpdateEntity(dto);
        String userLogin = SecurityUtils.getCurrentUserLogin();
        Client currentClient = clientService.findByUserLogin(userLogin);

        if(!entity.getId().equals(currentClient.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "error.client.invalid");
        }

        User updatedUser = userService.clientUpdate(entity.getUser());
        entity.setUser(updatedUser);

        Client updated = clientService.update(entity);

        return clientMapper.toDto(updated);
    }

    @Transactional(readOnly = true)
    public ClientToGetDTO get() {
        String userLogin = SecurityUtils.getCurrentUserLogin();
        Client client = clientService.get(userLogin);
        return clientMapper.toGetDto(client);
    }
}
