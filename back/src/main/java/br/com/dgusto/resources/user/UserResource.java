package br.com.dgusto.resources.user;

import br.com.dgusto.facade.admin.UserAdminFacade;
import br.com.dgusto.facade.dto.user.UserDTO;
import br.com.dgusto.facade.dto.user.UserToGetDTO;
import br.com.dgusto.facade.dto.user.UserToSaveDTO;
import br.com.dgusto.facade.dto.user.UserToUpdateDTO;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/user")
@PreAuthorize("hasRole('USER')")
public class UserResource {

    private final UserAdminFacade userFacade;

    public UserResource(UserAdminFacade userFacade) {
        this.userFacade = userFacade;
    }
    @PostMapping("/users")
    public UserDTO save(@RequestBody UserToSaveDTO dto) {
        return userFacade.save(dto);
    }

    @PutMapping("/users")
    public UserDTO update(@RequestBody UserToUpdateDTO dto) {
        return userFacade.update(dto);
    }

    @GetMapping("/users/{id}")
    public UserToGetDTO get(@PathVariable Long id) {
        return userFacade.get(id);
    }

    @DeleteMapping("/users/{id}")
    public void delete(@PathVariable Long id) {
        userFacade.delete(id);
    }
}
