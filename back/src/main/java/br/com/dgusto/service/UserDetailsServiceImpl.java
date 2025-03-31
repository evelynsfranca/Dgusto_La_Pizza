package br.com.dgusto.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.dgusto.domain.User;
import br.com.dgusto.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

        private final UserRepository userRepository;

        public UserDetailsServiceImpl(UserRepository userRepository) {
                this.userRepository = userRepository;
        }

        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                Optional<User> user = Optional.ofNullable(userRepository.findByUsernameWithAuthorities(username))
                                .orElseThrow(() -> new UsernameNotFoundException("User not found."));

                List<GrantedAuthority> authorities = user.get().getAuthorities().stream()
                                .map(authority -> new SimpleGrantedAuthority(authority.getName()))
                                .collect(Collectors.toList());

                return new org.springframework.security.core.userdetails.User(
                                user.get().getUsername(),
                                user.get().getPassword(),
                                authorities);
        }
}
