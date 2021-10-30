package br.com.dgusto.repository;

import br.com.dgusto.domain.Request;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

    @Query(value = "SELECT * FROM request r WHERE r.client_id = :clientId AND r.id = :requestId", nativeQuery = true)
    Optional<Request> findByClientIdAndRequestId(Long clientId, Long requestId);

    @Query(value = "SELECT * FROM request r WHERE r.client_id = :clientId ORDER BY id \n-- #pageable\n ", nativeQuery = true)
    Page<Request> findAllClientRequests(Long clientId, Pageable pageable);
}
