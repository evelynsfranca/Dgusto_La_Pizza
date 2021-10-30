package br.com.dgusto.service;

import br.com.dgusto.domain.Client;

public interface ClientService {

    Client save(Client client);

    Client findByUserLogin(String userLogin);
}
