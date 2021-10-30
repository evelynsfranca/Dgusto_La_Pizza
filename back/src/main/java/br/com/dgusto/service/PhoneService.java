package br.com.dgusto.service;

import br.com.dgusto.domain.Phone;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PhoneService {

    Phone save(Phone phone);

    Phone clientUpdate(Long clientId, Phone phone);

    Phone clientGet(Long clientId, Long phoneId);

    Page<Phone> clientGetAll(Long clientId, Pageable pageable);

    void clientDelete(Long clientId, Long phoneId);
 }
