package br.com.dgusto.repository;

import br.com.dgusto.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @EntityGraph(attributePaths = "authorities")
    User findByUsername(String username);

    Optional<User> findOneByUsername(String username);

    @Query(value = "SELECT * FROM user u INNER JOIN user_authority ua ON ua.user_id = u.id WHERE ua.authority_name = :authorityName ORDER BY u.id \n-- #pageable\n ", nativeQuery = true)
    Page<User> findAllByAuthority(String authorityName, Pageable pageable);
}
