package br.com.dgusto.service;

import br.com.dgusto.domain.Authority;
import br.com.dgusto.domain.User;
import br.com.dgusto.facade.vm.SignupVM;
import br.com.dgusto.repository.UserRepository;
import br.com.dgusto.security.SecurityUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class AccountServiceImpl implements AccountService {

    private final UserRepository userRepository;

    public AccountServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User signup(SignupVM vm) {

        if (userRepository.findOneByUsername(vm.getEmail()).isPresent()){
            return null;
        }

        User user = new User();
        user.setName(vm.getName());
        user.setEmail(vm.getEmail());
        user.setUsername(vm.getEmail());

        if (vm.getPassword().equals(vm.getPasswordConfirm())) {
            String encodedPassword = encodePassword(vm.getPassword());
            user.setPassword(encodedPassword);
        } else {
            return null;
        }

        Authority userAuthority = Authority.builder().name("ROLE_USER").build();
        Authority clientAuthority = Authority.builder().name("ROLE_CLIENT").build();
        Set<Authority> authorities = new HashSet<>();
        authorities.add(userAuthority);
        authorities.add(clientAuthority);
        user.setAuthorities(authorities);

        return userRepository.save(user);
    }

    @Override
    public User login(User user) {
        BCryptPasswordEncoder crypt = new BCryptPasswordEncoder();
        User entity = userRepository.findByUsername(user.getUsername());
        if(crypt.matches(user.getPassword(), entity.getPassword())) {
            return entity;
        } else {
            return null;
        }
    }
    @Override
    public User getUserWithAuthorities() {
        Optional<User> optionalUser = userRepository.findOneByUsername(SecurityUtils.getCurrentUserLogin());
        User user = null;
        if (optionalUser.isPresent()) {
            user = optionalUser.get();
            user.getAuthorities().size();
        }

        return user;
    }

    private String encodePassword(String password) {
        BCryptPasswordEncoder crypt = new BCryptPasswordEncoder();
        return crypt.encode(password);
    }
}
