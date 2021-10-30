package br.com.dgusto.facade.client;

import br.com.dgusto.domain.Address;
import br.com.dgusto.domain.Client;
import br.com.dgusto.facade.dto.address.AddressDTO;
import br.com.dgusto.facade.dto.address.AddressToGetAllDTO;
import br.com.dgusto.facade.dto.address.AddressToGetDTO;
import br.com.dgusto.facade.dto.address.AddressToSaveDTO;
import br.com.dgusto.facade.dto.address.AddressToUpdateDTO;
import br.com.dgusto.facade.mapper.AddressMapper;
import br.com.dgusto.security.SecurityUtils;
import br.com.dgusto.service.AddressService;
import br.com.dgusto.service.ClientService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AddressClientFacade {

    private final AddressService addressService;
    private final AddressMapper addressMapper;
    private final ClientService clientService;


    public AddressClientFacade(
        AddressService addressService,
        AddressMapper addressMapper,
        ClientService clientService
    ) {
        this.addressService = addressService;
        this.addressMapper = addressMapper;
        this.clientService = clientService;
    }

    @Transactional
    public AddressDTO save(AddressToSaveDTO dto) {
        Address entity = addressMapper.toSaveEntity(dto);

        String userLogin = SecurityUtils.getCurrentUserLogin();
        Client client = clientService.findByUserLogin(userLogin);

        entity.setClient(client);
        Address saved = addressService.save(entity);

        return addressMapper.toDto(saved);
    }

    @Transactional
    public AddressDTO update(AddressToUpdateDTO dto) {
        Address entity = addressMapper.toUpdateEntity(dto);

        String userLogin = SecurityUtils.getCurrentUserLogin();
        Client client = clientService.findByUserLogin(userLogin);

        Address updated = addressService.clientUpdate(client.getId(), entity);

        return addressMapper.toDto(updated);
    }

    @Transactional(readOnly = true)
    public AddressToGetDTO get(Long id) {
        String userLogin = SecurityUtils.getCurrentUserLogin();
        Client client = clientService.findByUserLogin(userLogin);

        Address address = addressService.clientGet(client.getId(), id);

        return addressMapper.toGetDto(address);
    }

    @Transactional(readOnly = true)
    public Page<AddressToGetAllDTO> getAll(Pageable pageable) {
        String userLogin = SecurityUtils.getCurrentUserLogin();
        Client client = clientService.findByUserLogin(userLogin);

        return addressService.clientGetAll(client.getId(), pageable)
            .map(addressMapper::toGetAllDto);
    }

    @Transactional
    public void delete(Long addressId) {
        String userLogin = SecurityUtils.getCurrentUserLogin();
        Client client = clientService.findByUserLogin(userLogin);

        addressService.clientDelete(client.getId(), addressId);
    }
}
