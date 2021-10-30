package br.com.dgusto.facade.client;

import br.com.dgusto.domain.Phone;
import br.com.dgusto.domain.Client;
import br.com.dgusto.facade.dto.phone.PhoneDTO;
import br.com.dgusto.facade.dto.phone.PhoneToGetAllDTO;
import br.com.dgusto.facade.dto.phone.PhoneToGetDTO;
import br.com.dgusto.facade.dto.phone.PhoneToSaveDTO;
import br.com.dgusto.facade.dto.phone.PhoneToUpdateDTO;
import br.com.dgusto.facade.mapper.PhoneMapper;
import br.com.dgusto.security.SecurityUtils;
import br.com.dgusto.service.PhoneService;
import br.com.dgusto.service.ClientService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PhoneClientFacade {

    private final PhoneService phoneService;
    private final PhoneMapper phoneMapper;
    private final ClientService clientService;

    public PhoneClientFacade(
        PhoneService phoneService,
        PhoneMapper phoneMapper,
        ClientService clientService
    ) {
        this.phoneService = phoneService;
        this.phoneMapper = phoneMapper;
        this.clientService = clientService;
    }

    @Transactional
    public PhoneDTO save(PhoneToSaveDTO dto) {
        Phone entity = phoneMapper.toSaveEntity(dto);

        String userLogin = SecurityUtils.getCurrentUserLogin();
        Client client = clientService.findByUserLogin(userLogin);

        entity.setClient(client);
        Phone saved = phoneService.save(entity);

        return phoneMapper.toDto(saved);
    }

    @Transactional
    public PhoneDTO update(PhoneToUpdateDTO dto) {
        Phone entity = phoneMapper.toUpdateEntity(dto);

        String userLogin = SecurityUtils.getCurrentUserLogin();
        Client client = clientService.findByUserLogin(userLogin);

        Phone updated = phoneService.clientUpdate(client.getId(), entity);

        return phoneMapper.toDto(updated);
    }

    @Transactional(readOnly = true)
    public PhoneToGetDTO get(Long id) {
        String userLogin = SecurityUtils.getCurrentUserLogin();
        Client client = clientService.findByUserLogin(userLogin);

        Phone phone = phoneService.clientGet(client.getId(), id);

        return phoneMapper.toGetDto(phone);
    }

    @Transactional(readOnly = true)
    public Page<PhoneToGetAllDTO> getAll(Pageable pageable) {
        String userLogin = SecurityUtils.getCurrentUserLogin();
        Client client = clientService.findByUserLogin(userLogin);

        return phoneService.clientGetAll(client.getId(), pageable)
            .map(phoneMapper::toGetAllDto);
    }

    @Transactional
    public void delete(Long phoneId) {
        String userLogin = SecurityUtils.getCurrentUserLogin();
        Client client = clientService.findByUserLogin(userLogin);

        phoneService.clientDelete(client.getId(), phoneId);
    }
}
