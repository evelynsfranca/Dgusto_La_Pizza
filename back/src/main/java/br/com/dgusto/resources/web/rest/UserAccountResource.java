package br.com.dgusto.resources.web.rest;

import br.com.dgusto.domain.User;
import br.com.dgusto.facade.UserFacade;
import br.com.dgusto.facade.dto.LoginDTO;
import br.com.dgusto.facade.dto.SignUpDTO;
import br.com.dgusto.facade.dto.UserDTO;
import br.com.dgusto.facade.dto.UserToSaveDTO;
import br.com.dgusto.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserAccountResource {

    private final UserFacade userFacade;

    public UserAccountResource(UserFacade userFacade) {
        this.userFacade = userFacade;
    }

    @PostMapping("/login")
    public UserDTO login(@RequestBody LoginDTO dto) {
        return userFacade.login(dto);
    }

    @PostMapping("/signup")
    public UserDTO signup(@RequestBody UserToSaveDTO dto) {
        return userFacade.save(dto);
    }
}
