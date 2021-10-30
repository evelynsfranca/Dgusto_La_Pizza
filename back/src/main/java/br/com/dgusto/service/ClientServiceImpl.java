package br.com.dgusto.service;

import br.com.dgusto.domain.Client;
import br.com.dgusto.repository.ClientRepository;
import org.springframework.stereotype.Service;

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
    public Client findByUserLogin(String userLogin) {
        return clientRepository.findByUserLogin(userLogin).orElseThrow();
    }
}
