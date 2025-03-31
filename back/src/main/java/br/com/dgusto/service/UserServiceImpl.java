package br.com.dgusto.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.dgusto.domain.User;
import br.com.dgusto.repository.UserRepository;
import br.com.dgusto.security.AuthoritiesConstants;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findOneByUsername(String username) {
        return userRepository.findOneByUsername(username);
    }

    // Admin

    @Override
    public User save(User user) {
        user.setPassword(encodePassword(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User update(User user) {
        return userRepository.findById(user.getId())
                .map(it -> {
                    it.setName(user.getName());
                    it.setEmail(user.getEmail());
                    it.setAuthorities(user.getAuthorities());
                    return it;
                })
                .map(userRepository::save)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.user.notFound"));
    }

    @Override
    public User get(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.user.notFound"));
    }

    @Override
    public Page<User> getAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.user.notFound"));
        user.getAuthorities().forEach(it -> it.getUser().remove(user));
        userRepository.delete(user);
    }

    @Override
    public Page<User> getAllAdmins(Pageable pageable) {
        return userRepository.findAllByAuthority(AuthoritiesConstants.ADMIN, pageable);
    }

    @Override
    public Page<User> getAllClients(Pageable pageable) {
        return userRepository.findAllByAuthority(AuthoritiesConstants.CLIENT, pageable);
    }

    @Override
    public Page<User> getAllEmployees(Pageable pageable) {
        return userRepository.findAllByAuthority(AuthoritiesConstants.EMPLOYEE, pageable);
    }

    // Client

    @Override
    public User clientSignup(User user) {

        if (userRepository.findOneByUsername(user.getEmail()).isPresent()) {
            return null;
        }

        user.setPassword(encodePassword(user.getPassword()));
        user.setUsername(user.getEmail());

        return userRepository.save(user);
    }

    @Override
    public User clientUpdate(User user) {
        return userRepository.findById(user.getId())
                .map(it -> {
                    it.setName(user.getName());
                    it.setEmail(user.getEmail());
                    it.setUsername(user.getEmail());
                    return it;
                }).map(userRepository::save)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.user.notFound"));
    }

    // Util

    private String encodePassword(String password) {
        BCryptPasswordEncoder crypt = new BCryptPasswordEncoder();
        return crypt.encode(password);
    }
}
