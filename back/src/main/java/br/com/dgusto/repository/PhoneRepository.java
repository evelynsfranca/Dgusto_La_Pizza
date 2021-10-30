package br.com.dgusto.repository;

import br.com.dgusto.domain.Phone;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PhoneRepository extends JpaRepository<Phone, Long> {

    @Query(value = "SELECT * FROM phone p WHERE p.client_id = :clientId AND p.id = :phoneId", nativeQuery = true)
    Optional<Phone> findByClientIdAndPhoneId(Long clientId, Long phoneId);

    @Query(value = "SELECT * FROM phone p WHERE p.client_id = :clientId ORDER BY id \n-- #pageable\n ", nativeQuery = true)
    Page<Phone> findAllClientPhones(Long clientId, Pageable pageable);
}
