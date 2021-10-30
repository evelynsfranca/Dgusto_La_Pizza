package br.com.dgusto.service;

import br.com.dgusto.domain.Authority;
import br.com.dgusto.repository.AuthorityRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthorityServiceImpl implements AuthorityService {

    private final AuthorityRepository authorityRepository;

    public AuthorityServiceImpl(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }

    @Override
    public Authority findById(String id) {
        return authorityRepository.findById(id).orElseThrow();
    }
}
