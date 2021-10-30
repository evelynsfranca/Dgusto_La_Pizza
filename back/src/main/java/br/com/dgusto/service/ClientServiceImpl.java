package br.com.dgusto.service;

import br.com.dgusto.domain.Client;
import br.com.dgusto.repository.ClientRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;

    public ClientServiceImpl(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }


    @Override
    public Client save(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public Client update(Client client) {
        return clientRepository.findById(client.getId())
            .map(it  -> {
                it.setCpf(client.getCpf());
                it.setAddresses(client.getAddresses());
                it.setPhones(client.getPhones());
                return it;
            }).map(clientRepository::save)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.client.notFound"));
    }

    @Override
    public Client get(String userLogin) {
        return clientRepository.findByUserLogin(userLogin)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.client.notFound"));
    }

    @Override
    public Client findByUserLogin(String userLogin) {
        return clientRepository.findByUserLogin(userLogin)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.client.notFound"));
    }

    @Override
    public Client findById(Long id) {
        return clientRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.client.notFound"));
    }
}
