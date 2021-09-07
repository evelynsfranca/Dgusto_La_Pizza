package br.com.dgusto.resources.web.rest.user;

import br.com.dgusto.facade.UserFacade;
import br.com.dgusto.facade.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/user")
@PreAuthorize("hasRole('USER')")
public class UserResource {

    private final UserFacade userFacade;

    public UserResource(
        UserFacade userFacade
    ) {
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
