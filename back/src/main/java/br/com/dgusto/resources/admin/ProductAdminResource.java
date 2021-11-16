package br.com.dgusto.resources.admin;

import br.com.dgusto.facade.admin.ProductAdminFacade;
import br.com.dgusto.facade.dto.product.ProductDTO;
import br.com.dgusto.facade.dto.product.ProductToAdminGetAllDTO;
import br.com.dgusto.facade.dto.product.ProductToGetDTO;
import br.com.dgusto.facade.dto.product.ProductToSaveDTO;
import br.com.dgusto.facade.dto.product.ProductToUpdateDTO;
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
public class ProductAdminResource {

    private final ProductAdminFacade productAdminFacade;

    public ProductAdminResource(ProductAdminFacade productAdminFacade) {
        this.productAdminFacade = productAdminFacade;
    }

    @PostMapping("/products")
    public ResponseEntity<ProductDTO> save(@Valid @RequestBody ProductToSaveDTO dto) {
        ProductDTO result = productAdminFacade.save(dto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @PutMapping("/products")
    public ResponseEntity<ProductDTO> update(@Valid @RequestBody ProductToUpdateDTO dto) {
        ProductDTO result = productAdminFacade.update(dto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductToGetDTO> get(@PathVariable Long id) {
        ProductToGetDTO result = productAdminFacade.get(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/products")
    public ResponseEntity<Page<ProductToAdminGetAllDTO>> getAll(Pageable pageable) {
        Page<ProductToAdminGetAllDTO> page = productAdminFacade.getAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/admin/products");
        return new ResponseEntity<>(page, headers, HttpStatus.OK);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Long> delete(@PathVariable Long id) {
        productAdminFacade.delete(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @GetMapping("/products/categories/{categoryName}")
    public ResponseEntity<Page<ProductToAdminGetAllDTO>> getAllPizzaFlavors(@PathVariable String categoryName, Pageable pageable) {
        Page<ProductToAdminGetAllDTO> page = productAdminFacade.getAllProductCategories(categoryName, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/admin/products/categories");
        return new ResponseEntity<>(page, headers, HttpStatus.OK);
    }

    @GetMapping("/products/types/{typeName}")
    public ResponseEntity<Page<ProductToAdminGetAllDTO>> getAllPizzaTypes(@PathVariable String typeName, Pageable pageable) {
        Page<ProductToAdminGetAllDTO> page = productAdminFacade.getAllProductTypes(typeName, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/admin/products/types");
        return new ResponseEntity<>(page, headers, HttpStatus.OK);
    }
}
