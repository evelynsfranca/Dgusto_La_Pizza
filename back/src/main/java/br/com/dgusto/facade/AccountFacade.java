package br.com.dgusto.facade;

import br.com.dgusto.domain.User;
import br.com.dgusto.facade.dto.LoginDTO;
import br.com.dgusto.facade.dto.SignupDTO;
import br.com.dgusto.facade.dto.user.UserDTO;
import br.com.dgusto.facade.mapper.AccountMapper;
import br.com.dgusto.facade.vm.SignupVM;
import br.com.dgusto.service.AccountService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
public class AccountFacade {

    private final AccountService accountService;
    private final AccountMapper accountMapper;

    public AccountFacade(
        AccountService accountService,
        AccountMapper accountMapper
    ) {
        this.accountService = accountService;
        this.accountMapper = accountMapper;
    }

    @Transactional
    public UserDTO login(LoginDTO dto) {
        User entity = accountMapper.toLoginEntity(dto);
        User saved = accountService.login(entity);
        return accountMapper.toDto(saved);
    }

    @Transactional
    public SignupDTO signup(SignupVM vm) {
        User saved = accountService.signup(vm);
        return accountMapper.toSignupDto(saved);
    }

    @Transactional(readOnly = true)
    public UserDTO getUserWithAuthorities() {
        UserDTO user = accountMapper.toDto(accountService.getUserWithAuthorities());
        user.setAuthorities(SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet()));
        return user;
    }
}
