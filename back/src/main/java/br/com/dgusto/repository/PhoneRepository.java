package br.com.dgusto.repository;

import br.com.dgusto.domain.Address;
import br.com.dgusto.domain.Phone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhoneRepository extends JpaRepository<Phone, Long> {
}
