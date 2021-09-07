package br.com.dgusto.resources.web.rest.admin;

import br.com.dgusto.facade.UserFacade;
import br.com.dgusto.facade.dto.UserDTO;
import br.com.dgusto.facade.dto.UserToGetAllDTO;
import br.com.dgusto.facade.dto.UserToGetDTO;
import br.com.dgusto.facade.dto.UserToSaveDTO;
import br.com.dgusto.facade.dto.UserToUpdateDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class UserAdminResource {

    private final UserFacade userFacade;

    public UserAdminResource(
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

    @GetMapping("/users")
    public Page<UserToGetAllDTO> getAll(Pageable pageable) {
        return userFacade.getAll(pageable);
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
