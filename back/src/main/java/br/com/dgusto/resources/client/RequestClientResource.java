package br.com.dgusto.resources.client;

import br.com.dgusto.facade.client.RequestClientFacade;
import br.com.dgusto.facade.dto.request.RequestDTO;
import br.com.dgusto.facade.dto.request.RequestToClientSaveDTO;
import br.com.dgusto.facade.dto.request.RequestToGetAllDTO;
import br.com.dgusto.facade.dto.request.RequestToGetDTO;
import br.com.dgusto.util.PaginationUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/client")
@PreAuthorize("hasRole('CLIENT')")
public class RequestClientResource {

    private final RequestClientFacade requestClientFacade;

    public RequestClientResource(RequestClientFacade requestClientFacade) {
        this.requestClientFacade = requestClientFacade;
    }

    @PostMapping("/requests")
    public ResponseEntity<RequestDTO> save(@RequestBody RequestToClientSaveDTO dto) {
        RequestDTO result = requestClientFacade.save(dto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @PutMapping("/requests/{id}")
    public ResponseEntity<RequestDTO> update(@PathVariable Long id) {
        RequestDTO result = requestClientFacade.update(id);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/requests/{id}")
    public ResponseEntity<RequestToGetDTO> get(@PathVariable Long id) {
        RequestToGetDTO result = requestClientFacade.get(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/requests")
    public ResponseEntity<Page<RequestToGetAllDTO>> getAll(Pageable pageable) {
        Page<RequestToGetAllDTO> page = requestClientFacade.getAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/client/requests");
        return new ResponseEntity<>(page, headers, HttpStatus.OK);
    }
}
