package br.com.dgusto.service;

import br.com.dgusto.domain.Phone;
import br.com.dgusto.repository.PhoneRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PhoneServiceImpl implements PhoneService {

    private final PhoneRepository phoneRepository;

    public PhoneServiceImpl(
        PhoneRepository phoneRepository
    ) {
        this.phoneRepository = phoneRepository;
    }

    @Override
    public Phone save(Phone phone) {
        return phoneRepository.save(phone);
    }

    @Override
    public Phone clientUpdate(Long clientId, Phone phone) {
        return phoneRepository.findByClientIdAndPhoneId(clientId, phone.getId())
            .map(it  -> {
                it.setAreaCode(phone.getAreaCode());
                it.setNumber(phone.getNumber());
                it.setType(phone.getType());
                it.setMainPhone(phone.getMainPhone());
                return it;
            }).map(phoneRepository::save)
            .orElseThrow();
    }

    @Override
    public Phone clientGet(Long clientId, Long phoneId) {
        return phoneRepository.findByClientIdAndPhoneId(clientId, phoneId).orElseThrow();
    }

    @Override
    public Page<Phone> clientGetAll(Long clientId, Pageable pageable) {
        return phoneRepository.findAllClientPhones(clientId, pageable);
    }

    @Override
    public void clientDelete(Long clientId, Long phoneId) {
        Phone phone = phoneRepository.findByClientIdAndPhoneId(clientId, phoneId).orElseThrow();
        phoneRepository.delete(phone);
    }
}
