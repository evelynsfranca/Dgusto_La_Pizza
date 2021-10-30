package br.com.dgusto.resources.client;

import br.com.dgusto.facade.client.ClientFacade;
import br.com.dgusto.facade.dto.client.ClientDTO;
import br.com.dgusto.facade.dto.client.ClientToGetDTO;
import br.com.dgusto.facade.dto.client.ClientToUpdateDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/client")
@PreAuthorize("hasRole('CLIENT')")
public class ClientResource {

    private final ClientFacade clientFacade;

    public ClientResource(ClientFacade clientFacade) {
        this.clientFacade = clientFacade;
    }

    @PutMapping("/me")
    public ResponseEntity<ClientDTO> update(@RequestBody ClientToUpdateDTO dto) {
        ClientDTO result = clientFacade.update(dto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/me")
    public ResponseEntity<ClientToGetDTO> get() {
        ClientToGetDTO result = clientFacade.get();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
