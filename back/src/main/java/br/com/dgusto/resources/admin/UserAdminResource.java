package br.com.dgusto.resources.admin;

import br.com.dgusto.facade.admin.UserAdminFacade;
import br.com.dgusto.facade.dto.user.UserDTO;
import br.com.dgusto.facade.dto.user.UserToGetAllDTO;
import br.com.dgusto.facade.dto.user.UserToGetDTO;
import br.com.dgusto.facade.dto.user.UserToSaveDTO;
import br.com.dgusto.facade.dto.user.UserToUpdateDTO;
import br.com.dgusto.util.PaginationUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class UserAdminResource {

    private final UserAdminFacade userAdminFacade;

    public UserAdminResource(UserAdminFacade userAdminFacade) {
        this.userAdminFacade = userAdminFacade;
    }

    @PostMapping("/users")
    public ResponseEntity<UserDTO> save(@Valid @RequestBody UserToSaveDTO dto) {
        UserDTO result = userAdminFacade.save(dto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @PutMapping("/users")
    public ResponseEntity<UserDTO> update(@Valid @RequestBody UserToUpdateDTO dto) {
        UserDTO result = userAdminFacade.update(dto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserToGetDTO> get(@PathVariable Long id) {
        UserToGetDTO result = userAdminFacade.get(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<Page<UserToGetAllDTO>> getAll(Pageable pageable) {
        Page<UserToGetAllDTO> page = userAdminFacade.getAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/admin/users");
        return new ResponseEntity<>(page, headers, HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Long> delete(@PathVariable Long id) {
        userAdminFacade.delete(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @GetMapping("/users/admin")
    public ResponseEntity<Page<UserToGetAllDTO>> getAllAdmins(Pageable pageable) {
        Page<UserToGetAllDTO> page = userAdminFacade.getAllAdmins(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/admin/users/admin");
        return new ResponseEntity<>(page, headers, HttpStatus.OK);
    }

    @GetMapping("/users/client")
    public ResponseEntity<Page<UserToGetAllDTO>> getAllClients(Pageable pageable) {
        Page<UserToGetAllDTO> page = userAdminFacade.getAllClients(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/admin/users/client");
        return new ResponseEntity<>(page, headers, HttpStatus.OK);
    }

    @GetMapping("/users/employee")
    public ResponseEntity<Page<UserToGetAllDTO>> getAllEmployees(Pageable pageable) {
        Page<UserToGetAllDTO> page = userAdminFacade.getAllEmployees(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/admin/users/employee");
        return new ResponseEntity<>(page, headers, HttpStatus.OK);
    }
}
