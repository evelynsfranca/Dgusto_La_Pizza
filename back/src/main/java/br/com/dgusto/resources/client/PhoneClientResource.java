package br.com.dgusto.resources.client;

import br.com.dgusto.facade.client.PhoneClientFacade;
import br.com.dgusto.facade.dto.phone.PhoneDTO;
import br.com.dgusto.facade.dto.phone.PhoneToGetAllDTO;
import br.com.dgusto.facade.dto.phone.PhoneToGetDTO;
import br.com.dgusto.facade.dto.phone.PhoneToSaveDTO;
import br.com.dgusto.facade.dto.phone.PhoneToUpdateDTO;
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
@RequestMapping("/api/client")
@PreAuthorize("hasRole('CLIENT')")
public class PhoneClientResource {

    private final PhoneClientFacade phoneClientFacade;

    public PhoneClientResource(PhoneClientFacade phoneClientFacade) {
        this.phoneClientFacade = phoneClientFacade;
    }

    @PostMapping("/phones")
    public ResponseEntity<PhoneDTO> save(@Valid @RequestBody PhoneToSaveDTO dto) {
        PhoneDTO result = phoneClientFacade.save(dto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @PutMapping("/phones")
    public ResponseEntity<PhoneDTO> update(@Valid @RequestBody PhoneToUpdateDTO dto) {
        PhoneDTO result = phoneClientFacade.update(dto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/phones/{id}")
    public ResponseEntity<PhoneToGetDTO> get(@PathVariable Long id) {
        PhoneToGetDTO result = phoneClientFacade.get(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/phones")
    public ResponseEntity<Page<PhoneToGetAllDTO>> getAll(Pageable pageable) {
        Page<PhoneToGetAllDTO> page = phoneClientFacade.getAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/client/phones");
        return new ResponseEntity<>(page, headers, HttpStatus.OK);
    }

    @DeleteMapping("/phones/{id}")
    public ResponseEntity<Long> delete(@PathVariable Long id) {
        phoneClientFacade.delete(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
