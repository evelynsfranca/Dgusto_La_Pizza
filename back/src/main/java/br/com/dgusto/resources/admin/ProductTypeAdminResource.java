package br.com.dgusto.resources.admin;

import br.com.dgusto.facade.admin.ProductTypeAdminFacade;
import br.com.dgusto.facade.dto.producttype.ProductTypeDTO;
import br.com.dgusto.facade.dto.producttype.ProductTypeToGetAllDTO;
import br.com.dgusto.facade.dto.producttype.ProductTypeToGetDTO;
import br.com.dgusto.facade.dto.producttype.ProductTypeToSaveDTO;
import br.com.dgusto.facade.dto.producttype.ProductTypeToUpdateDTO;
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
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class ProductTypeAdminResource {

    private final ProductTypeAdminFacade productTypeAdminFacade;

    public ProductTypeAdminResource(
            ProductTypeAdminFacade productTypeAdminFacade
    ) {
        this.productTypeAdminFacade = productTypeAdminFacade;
    }

    @PostMapping("/product-types")
    public ResponseEntity<ProductTypeDTO> save(@RequestBody ProductTypeToSaveDTO dto) {
        ProductTypeDTO result = productTypeAdminFacade.save(dto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @PutMapping("/product-types")
    public ResponseEntity<ProductTypeDTO> update(@RequestBody ProductTypeToUpdateDTO dto) {
        ProductTypeDTO result = productTypeAdminFacade.update(dto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/product-types/{id}")
    public ResponseEntity<ProductTypeToGetDTO> get(@PathVariable Long id) {
        ProductTypeToGetDTO result = productTypeAdminFacade.get(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/product-types")
    public ResponseEntity<Page<ProductTypeToGetAllDTO>> getAll(Pageable pageable) {
        Page<ProductTypeToGetAllDTO> page = productTypeAdminFacade.getAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/admin/product-types");
        return ResponseEntity.ok().headers(headers).body(page);
    }

    @DeleteMapping("/product-types/{id}")
    public void delete(@PathVariable Long id) {
        productTypeAdminFacade.delete(id);
    }
}
