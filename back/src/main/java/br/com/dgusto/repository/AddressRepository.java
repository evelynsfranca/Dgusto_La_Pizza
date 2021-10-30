package br.com.dgusto.repository;

import br.com.dgusto.domain.Address;
import br.com.dgusto.domain.Product;
import br.com.dgusto.domain.ProductType;
import br.com.dgusto.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    @Query(value = "SELECT * FROM address a WHERE a.client_id = :clientId AND a.id = :addressId", nativeQuery = true)
    Optional<Address> findByClientIdAndAddressId(Long clientId, Long addressId);

    @Query(value = "SELECT * FROM address a WHERE a.client_id = :clientId ORDER BY id \n-- #pageable\n ", nativeQuery = true)
    Page<Address> findAllClientAddresses(Long clientId, Pageable pageable);
}
