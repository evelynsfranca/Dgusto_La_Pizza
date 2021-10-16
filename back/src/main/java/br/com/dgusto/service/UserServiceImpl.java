package br.com.dgusto.service;

import br.com.dgusto.domain.User;
import br.com.dgusto.repository.AuthorityRepository;
import br.com.dgusto.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final AuthorityRepository authorityRepository;

    public UserServiceImpl(
        UserRepository userRepository,
        AuthorityRepository authorityRepository
    ) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
    }

    @Override
    public User save(User user) {
        user.setPassword(encodePassword(user.getPassword()));
        user.setAuthorities(
            user.getAuthorities().stream()
                .map(it -> authorityRepository.findById(it.getName()).orElseThrow())
                .collect(Collectors.toSet())
        );
        return userRepository.save(user);
    }

    @Override
    public User update(User user) {
        return userRepository.findById(user.getId())
            .map(it -> {
                it.setName(user.getName());
                it.setEmail(user.getEmail());
                it.setPassword(encodePassword(user.getPassword()));
                it.setAuthorities(
                    user.getAuthorities().stream()
                        .map(authority -> authorityRepository.findById(authority.getName()).orElseThrow())
                        .collect(Collectors.toSet())
                );
                return it;
            })
            .map(userRepository::save)
            .orElseThrow();
    }

    @Override
    public User get(Long id) {
        return userRepository.findById(id)
            .orElseThrow();
    }

    @Override
    public Page<User> getAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow();

        userRepository.delete(user);
    }

    private String encodePassword(String password) {
        BCryptPasswordEncoder crypt = new BCryptPasswordEncoder();
        return crypt.encode(password);
    }
}
