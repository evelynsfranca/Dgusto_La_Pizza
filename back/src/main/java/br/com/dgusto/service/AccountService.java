package br.com.dgusto.service;

import br.com.dgusto.domain.User;
import br.com.dgusto.facade.vm.SignupVM;

public interface AccountService {

    User signup(SignupVM vm);

    User login(User user);

    User getUserWithAuthorities();
}
