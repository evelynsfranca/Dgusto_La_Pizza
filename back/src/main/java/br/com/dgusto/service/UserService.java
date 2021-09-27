package br.com.dgusto.service;

import br.com.dgusto.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

    User save(User user);

    User update(User user);

    User get(Long id);

    Page<User> getAll(Pageable pageable);

    void delete(Long id);
}
