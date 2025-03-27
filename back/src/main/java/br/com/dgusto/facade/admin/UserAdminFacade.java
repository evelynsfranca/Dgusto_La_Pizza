package br.com.dgusto.facade.admin;

import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.dgusto.domain.User;
import br.com.dgusto.facade.dto.user.UserDTO;
import br.com.dgusto.facade.dto.user.UserToGetAllDTO;
import br.com.dgusto.facade.dto.user.UserToGetDTO;
import br.com.dgusto.facade.dto.user.UserToSaveDTO;
import br.com.dgusto.facade.dto.user.UserToUpdateDTO;
import br.com.dgusto.facade.mapper.UserMapper;
import br.com.dgusto.service.AuthorityService;
import br.com.dgusto.service.UserService;

@Service
public class UserAdminFacade {

    private final UserService userService;
    private final UserMapper userMapper;
    private final AuthorityService authorityService;

    public UserAdminFacade(
            UserService userService,
            UserMapper userMapper,
            AuthorityService authorityService) {
        this.userService = userService;
        this.userMapper = userMapper;
        this.authorityService = authorityService;
    }

    @Transactional
    public UserDTO save(UserToSaveDTO dto) {
        User entity = userMapper.toSaveEntity(dto);

        entity.setAuthorities(
                entity.getAuthorities().stream()
                        .map(it -> authorityService.findById(it.getName()))
                        .collect(Collectors.toSet()));

        User saved = userService.save(entity);
        return userMapper.toDto(saved);
    }

    @Transactional
    public UserDTO update(UserToUpdateDTO dto) {
        User entity = userMapper.toUpdateEntity(dto);

        entity.setAuthorities(
                entity.getAuthorities().stream()
                        .map(it -> authorityService.findById(it.getName()))
                        .collect(Collectors.toSet()));

        User saved = userService.update(entity);
        return userMapper.toDto(saved);
    }

    @Transactional(readOnly = true)
    public UserToGetDTO get(Long id) {
        User user = userService.get(id);
        return userMapper.toGetDto(user);
    }

    @Transactional(readOnly = true)
    public Page<UserToGetAllDTO> getAll(Pageable pageable) {
        return userService.getAll(pageable)
                .map(userMapper::toGetAllDto);
    }

    @Transactional(readOnly = true)
    public Page<UserToGetAllDTO> getAllAdmins(Pageable pageable) {
        return userService.getAllAdmins(pageable)
                .map(userMapper::toGetAllDto);
    }

    @Transactional(readOnly = true)
    public Page<UserToGetAllDTO> getAllClients(Pageable pageable) {
        return userService.getAllClients(pageable)
                .map(userMapper::toGetAllDto);
    }

    @Transactional(readOnly = true)
    public Page<UserToGetAllDTO> getAllEmployees(Pageable pageable) {
        return userService.getAllEmployees(pageable)
                .map(userMapper::toGetAllDto);
    }

    @Transactional
    public void delete(Long id) {
        userService.delete(id);
    }
}
