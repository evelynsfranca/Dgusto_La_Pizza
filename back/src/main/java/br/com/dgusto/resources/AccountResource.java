package br.com.dgusto.resources;

import br.com.dgusto.facade.AccountFacade;
import br.com.dgusto.facade.dto.LoginDTO;
import br.com.dgusto.facade.dto.SignupDTO;
import br.com.dgusto.facade.dto.user.UserDTO;
import br.com.dgusto.facade.vm.SignupVM;
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

    @PostMapping("/login")
    public UserDTO login(@RequestBody LoginDTO dto) {
        return accountFacade.login(dto);
    }

    @PostMapping("/signup")
    public SignupDTO signup(@RequestBody SignupVM vm) {
        return accountFacade.signup(vm);
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
