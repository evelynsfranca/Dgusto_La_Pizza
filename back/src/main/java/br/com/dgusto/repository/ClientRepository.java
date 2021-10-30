package br.com.dgusto.repository;

import br.com.dgusto.domain.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    @Query(value = "SELECT * FROM client c INNER JOIN user u on c.user_id = u.id WHERE u.username = :userLogin", nativeQuery = true)
    Optional<Client> findByUserLogin(String userLogin);
}
