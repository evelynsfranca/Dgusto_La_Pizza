package br.com.dgusto.service;

import br.com.dgusto.domain.Address;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AddressService {

    Address save(Address address);

    Address get(Long id);

    Address clientUpdate(Long clientId, Address address);

    Address clientGet(Long clientId, Long addressId);

    Page<Address> clientGetAll(Long clientId, Pageable pageable);

    void clientDelete(Long clientId, Long addressId);
 }
