package br.com.dgusto.resources;

import br.com.dgusto.facade.AccountFacade;
import br.com.dgusto.facade.dto.client.ClientDTO;
import br.com.dgusto.facade.dto.client.ClientToSaveDTO;
import br.com.dgusto.facade.dto.user.UserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class AccountResource {

    private final AccountFacade accountFacade;

    public AccountResource(AccountFacade accountFacade) {
        this.accountFacade = accountFacade;
    }

    @PostMapping("/signup")
    public ResponseEntity<ClientDTO> clientSignup(@RequestBody ClientToSaveDTO dto) {
        ClientDTO result = accountFacade.clientSignup(dto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/authenticate")
    public String isAuthenticated(HttpServletRequest request) {
        return request.getRemoteUser();
    }

    @GetMapping("/account")
    public UserDTO getCurrentUserAccount() {
        return accountFacade.getUserWithAuthorities();
    }
}
