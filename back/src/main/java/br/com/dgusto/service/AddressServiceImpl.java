package br.com.dgusto.service;

import br.com.dgusto.domain.Address;
import br.com.dgusto.repository.AddressRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;

    public AddressServiceImpl(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Override
    public Address save(Address address) {
        return addressRepository.save(address);
    }

    @Override
    public Address get(Long id) {
        return addressRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.address.notFound"));
    }

    @Override
    public Address clientUpdate(Long clientId, Address address) {
        return addressRepository.findByClientIdAndAddressId(clientId, address.getId())
            .map(it  -> {
                it.setStreet(address.getStreet());
                it.setNumber(address.getNumber());
                it.setComplement(address.getComplement());
                it.setReference(address.getReference());
                it.setNeighborhood(address.getNeighborhood());
                it.setZipCode(address.getZipCode());
                it.setCity(address.getCity());
                it.setState(address.getState());
                it.setCountry(address.getCountry());
                it.setMainAddress(address.getMainAddress());
                return it;
            }).map(addressRepository::save)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.address.notFound"));
    }

    @Override
    public Address clientGet(Long clientId, Long addressId) {
        return addressRepository.findByClientIdAndAddressId(clientId, addressId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.address.notFound"));
    }

    @Override
    public Page<Address> clientGetAll(Long clientId, Pageable pageable) {
        return addressRepository.findAllClientAddresses(clientId, pageable);
    }

    @Override
    public void clientDelete(Long clientId, Long addressId) {
        Address address = addressRepository.findByClientIdAndAddressId(clientId, addressId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.address.notFound"));
        addressRepository.delete(address);
    }
}
