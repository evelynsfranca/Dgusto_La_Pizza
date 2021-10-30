package br.com.dgusto.resources.client;

import br.com.dgusto.facade.client.AddressClientFacade;
import br.com.dgusto.facade.dto.address.AddressDTO;
import br.com.dgusto.facade.dto.address.AddressToGetAllDTO;
import br.com.dgusto.facade.dto.address.AddressToGetDTO;
import br.com.dgusto.facade.dto.address.AddressToSaveDTO;
import br.com.dgusto.facade.dto.address.AddressToUpdateDTO;
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

@RestController
@RequestMapping("/api/client")
@PreAuthorize("hasRole('CLIENT')")
public class AddressClientResource {

    private final AddressClientFacade addressClientFacade;

    public AddressClientResource(
        AddressClientFacade addressClientFacade
    ) {
        this.addressClientFacade = addressClientFacade;
    }

    @PostMapping("/addresses")
    public ResponseEntity<AddressDTO> save(@RequestBody AddressToSaveDTO dto) {
        AddressDTO result = addressClientFacade.save(dto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @PutMapping("/addresses")
    public ResponseEntity<AddressDTO> update(@RequestBody AddressToUpdateDTO dto) {
        AddressDTO result = addressClientFacade.update(dto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/addresses/{id}")
    public ResponseEntity<AddressToGetDTO> get(@PathVariable Long id) {
        AddressToGetDTO result = addressClientFacade.get(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/addresses")
    public ResponseEntity<Page<AddressToGetAllDTO>> getAll(Pageable pageable) {
        Page<AddressToGetAllDTO> page = addressClientFacade.getAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/admin/addresses");
        return new ResponseEntity<>(page, headers, HttpStatus.OK);
    }

    @DeleteMapping("/addresses/{id}")
    public ResponseEntity<Long> delete(@PathVariable Long id) {
        addressClientFacade.delete(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
