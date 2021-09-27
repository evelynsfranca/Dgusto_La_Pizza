package br.com.dgusto.resources.admin;

import br.com.dgusto.facade.admin.UserAdminFacade;
import br.com.dgusto.facade.dto.user.UserDTO;
import br.com.dgusto.facade.dto.user.UserToGetAllDTO;
import br.com.dgusto.facade.dto.user.UserToGetDTO;
import br.com.dgusto.facade.dto.user.UserToSaveDTO;
import br.com.dgusto.facade.dto.user.UserToUpdateDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class UserAdminResource {

    private final UserAdminFacade userAdminFacade;

    public UserAdminResource(
        UserAdminFacade userAdminFacade
    ) {
        this.userAdminFacade = userAdminFacade;
    }
    @PostMapping("/users")
    public UserDTO save(@RequestBody UserToSaveDTO dto) {
        return userAdminFacade.save(dto);
    }

    @PutMapping("/users")
    public UserDTO update(@RequestBody UserToUpdateDTO dto) {
        return userAdminFacade.update(dto);
    }

    @GetMapping("/users/{id}")
    public UserToGetDTO get(@PathVariable Long id) {
        return userAdminFacade.get(id);
    }

    @GetMapping("/users")
    public Page<UserToGetAllDTO> getAll(Pageable pageable) {
        return userAdminFacade.getAll(pageable);
    }

    @DeleteMapping("/users/{id}")
    public void delete(@PathVariable Long id) {
        userAdminFacade.delete(id);
    }
}
