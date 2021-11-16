package br.com.dgusto.resources.admin;

import br.com.dgusto.facade.admin.ProductCategoryAdminFacade;
import br.com.dgusto.facade.dto.productcategory.ProductCategoryDTO;
import br.com.dgusto.facade.dto.productcategory.ProductCategoryToGetAllDTO;
import br.com.dgusto.facade.dto.productcategory.ProductCategoryToGetDTO;
import br.com.dgusto.facade.dto.productcategory.ProductCategoryToSaveDTO;
import br.com.dgusto.facade.dto.productcategory.ProductCategoryToUpdateDTO;
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
public class ProductCategoryAdminResource {

    private final ProductCategoryAdminFacade productTypeAdminFacade;

    public ProductCategoryAdminResource(ProductCategoryAdminFacade productTypeAdminFacade) {
        this.productTypeAdminFacade = productTypeAdminFacade;
    }

    @PostMapping("/product-categories")
    public ResponseEntity<ProductCategoryDTO> save(@Valid @RequestBody ProductCategoryToSaveDTO dto) {
        ProductCategoryDTO result = productTypeAdminFacade.save(dto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @PutMapping("/product-categories")
    public ResponseEntity<ProductCategoryDTO> update(@Valid @RequestBody ProductCategoryToUpdateDTO dto) {
        ProductCategoryDTO result = productTypeAdminFacade.update(dto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/product-categories/{id}")
    public ResponseEntity<ProductCategoryToGetDTO> get(@PathVariable Long id) {
        ProductCategoryToGetDTO result = productTypeAdminFacade.get(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/product-categories")
    public ResponseEntity<Page<ProductCategoryToGetAllDTO>> getAll(Pageable pageable) {
        Page<ProductCategoryToGetAllDTO> page = productTypeAdminFacade.getAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/admin/product-categories");
        return new ResponseEntity<>(page, headers, HttpStatus.OK);
    }

    @DeleteMapping("/product-categories/{id}")
    public ResponseEntity<Long> delete(@PathVariable Long id) {
        productTypeAdminFacade.delete(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
