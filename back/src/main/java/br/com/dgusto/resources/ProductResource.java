package br.com.dgusto.resources;

import br.com.dgusto.facade.ProductFacade;
import br.com.dgusto.facade.dto.product.ProductToGetAllDTO;
import br.com.dgusto.facade.dto.product.ProductToGetDTO;
import br.com.dgusto.util.PaginationUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ProductResource {

    private final ProductFacade productFacade;

    public ProductResource(
        ProductFacade productFacade
    ) {
        this.productFacade = productFacade;
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductToGetDTO> get(@PathVariable Long id) {
        ProductToGetDTO result = productFacade.get(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/products")
    public ResponseEntity<Page<ProductToGetAllDTO>> getAll(Pageable pageable) {
        Page<ProductToGetAllDTO> page = productFacade.getAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/admin/products");
        return ResponseEntity.ok().headers(headers).body(page);
    }

    @GetMapping("/products/categories/{categoryName}")
    public ResponseEntity<Page<ProductToGetAllDTO>> getAllPizzaFlavors(@PathVariable String categoryName, Pageable pageable) {
        Page<ProductToGetAllDTO> page = productFacade.getAllProductCategories(categoryName, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/admin/products/categories");
        return ResponseEntity.ok().headers(headers).body(page);
    }

    @GetMapping("/products/types/{typeName}")
    public ResponseEntity<Page<ProductToGetAllDTO>> getAllPizzaTypes(@PathVariable String typeName, Pageable pageable) {
        Page<ProductToGetAllDTO> page = productFacade.getAllProductTypes(typeName, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/admin/products/types");
        return ResponseEntity.ok().headers(headers).body(page);
    }
}
