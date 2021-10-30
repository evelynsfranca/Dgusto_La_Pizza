package br.com.dgusto.repository;

import br.com.dgusto.domain.RequestItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestItemRepository extends JpaRepository<RequestItem, Long> {
}
