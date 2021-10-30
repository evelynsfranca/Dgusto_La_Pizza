package br.com.dgusto.service;

import br.com.dgusto.domain.Client;

public interface ClientService {

    Client save(Client client);

    Client update(Client client);

    Client get(String userLogin);

    Client findByUserLogin(String userLogin);

    Client findById(Long id);
}
