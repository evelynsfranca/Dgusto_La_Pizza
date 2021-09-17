package br.com.dgusto.repository;

import br.com.dgusto.domain.Client;
import br.com.dgusto.domain.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
}
