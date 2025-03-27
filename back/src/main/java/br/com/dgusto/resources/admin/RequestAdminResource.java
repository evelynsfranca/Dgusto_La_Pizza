package br.com.dgusto.resources.admin;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.dgusto.facade.admin.RequestAdminFacade;
import br.com.dgusto.facade.dto.request.RequestDTO;
import br.com.dgusto.facade.dto.request.RequestToAdminUpdateDTO;
import br.com.dgusto.facade.dto.request.RequestToGetAllDTO;
import br.com.dgusto.facade.dto.request.RequestToGetDTO;
import br.com.dgusto.util.PaginationUtil;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class RequestAdminResource {

    private final RequestAdminFacade requestAdminFacade;

    public RequestAdminResource(RequestAdminFacade requestAdminFacade) {
        this.requestAdminFacade = requestAdminFacade;
    }

    @PutMapping("/requests")
    public ResponseEntity<RequestDTO> update(@Valid @RequestBody RequestToAdminUpdateDTO dto) {
        RequestDTO result = requestAdminFacade.update(dto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/requests/{id}")
    public ResponseEntity<RequestToGetDTO> get(@PathVariable Long id) {
        RequestToGetDTO result = requestAdminFacade.get(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/requests")
    public ResponseEntity<Page<RequestToGetAllDTO>> getAll(Pageable pageable) {
        Page<RequestToGetAllDTO> page = requestAdminFacade.getAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/admin/requests");
        return new ResponseEntity<>(page, headers, HttpStatus.OK);
    }
}
