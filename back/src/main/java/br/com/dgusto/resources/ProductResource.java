package br.com.dgusto.resources;

import br.com.dgusto.facade.ProductFacade;
import br.com.dgusto.facade.dto.product.ProductToGetAllDTO;
import br.com.dgusto.facade.dto.product.ProductToGetDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public ProductToGetDTO get(@PathVariable Long id) {
        return productFacade.get(id);
    }

    @GetMapping("/products")
    public Page<ProductToGetAllDTO> getAll(Pageable pageable) {
        return productFacade.getAll(pageable);
    }

    @GetMapping("/products/flavors")
    public Page<ProductToGetAllDTO> getAllPizzaFlavors(Pageable pageable) {
        return productFacade.getAllPizzaFlavors(pageable);
    }

    @GetMapping("/products/sizes")
    public Page<ProductToGetAllDTO> getAllPizzaSizes(Pageable pageable) {
        return productFacade.getAllPizzaSizes(pageable);
    }

    @GetMapping("/products/drinks")
    public Page<ProductToGetAllDTO> getAllDrinks(Pageable pageable) {
        return productFacade.getAllDrinks(pageable);
    }

    @GetMapping("/products/others")
    public Page<ProductToGetAllDTO> getAllOthers(Pageable pageable) {
        return productFacade.getAllOthers(pageable);
    }
}
