package br.com.dgusto.resources.admin;

import br.com.dgusto.facade.admin.ProductAdminFacade;
import br.com.dgusto.facade.dto.product.ProductDTO;
import br.com.dgusto.facade.dto.product.ProductToAdminGetAllDTO;
import br.com.dgusto.facade.dto.product.ProductToGetDTO;
import br.com.dgusto.facade.dto.product.ProductToSaveDTO;
import br.com.dgusto.facade.dto.product.ProductToUpdateDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
public class ProductAdminResource {

    private final ProductAdminFacade productAdminFacade;

    public ProductAdminResource(
            ProductAdminFacade productAdminFacade
    ) {
        this.productAdminFacade = productAdminFacade;
    }
    @PostMapping("/products")
    public ProductDTO save(@RequestBody ProductToSaveDTO dto) {
        return productAdminFacade.save(dto);
    }

    @PutMapping("/products")
    public ProductDTO update(@RequestBody ProductToUpdateDTO dto) {
        return productAdminFacade.update(dto);
    }

    @GetMapping("/products/{id}")
    public ProductToGetDTO get(@PathVariable Long id) {
        return productAdminFacade.get(id);
    }

    @GetMapping("/products")
    public Page<ProductToAdminGetAllDTO> getAll(Pageable pageable) {
        return productAdminFacade.getAll(pageable);
    }

    @GetMapping("/products/flavors")
    public Page<ProductToAdminGetAllDTO> getAllPizzaFlavors(Pageable pageable) {
        return productAdminFacade.getAllPizzaFlavors(pageable);
    }

    @GetMapping("/products/sizes")
    public Page<ProductToAdminGetAllDTO> getAllPizzaSizes(Pageable pageable) {
        return productAdminFacade.getAllPizzaSizes(pageable);
    }

    @GetMapping("/products/drinks")
    public Page<ProductToAdminGetAllDTO> getAllDrinks(Pageable pageable) {
        return productAdminFacade.getAllDrinks(pageable);
    }

    @GetMapping("/products/others")
    public Page<ProductToAdminGetAllDTO> getAllOthers(Pageable pageable) {
        return productAdminFacade.getAllOthers(pageable);
    }

    @DeleteMapping("/products/{id}")
    public void delete(@PathVariable Long id) {
        productAdminFacade.delete(id);
    }
}
