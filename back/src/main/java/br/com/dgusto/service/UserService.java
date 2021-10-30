package br.com.dgusto.service;

import br.com.dgusto.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface UserService {

    //

    User findByUsername(String username);

    Optional<User> findOneByUsername(String username);

    // Admin

    User save(User user);

    User update(User user);

    User get(Long id);

    Page<User> getAll(Pageable pageable);

    void delete(Long id);

    Page<User> getAllAdmins(Pageable pageable);

    Page<User> getAllClients(Pageable pageable);

    Page<User> getAllEmployees(Pageable pageable);

    // Client

    User clientSignup(User user);

    User clientUpdate(User user);
}
