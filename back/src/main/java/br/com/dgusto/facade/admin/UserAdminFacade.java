package br.com.dgusto.facade.admin;

import br.com.dgusto.domain.User;
import br.com.dgusto.facade.dto.user.UserDTO;
import br.com.dgusto.facade.dto.user.UserToGetAllDTO;
import br.com.dgusto.facade.dto.user.UserToGetDTO;
import br.com.dgusto.facade.dto.user.UserToSaveDTO;
import br.com.dgusto.facade.dto.user.UserToUpdateDTO;
import br.com.dgusto.facade.mapper.UserMapper;
import br.com.dgusto.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class UserAdminFacade {

    private final UserService userService;
    private final UserMapper userMapper;

    public UserAdminFacade(
        UserService userService,
        UserMapper userMapper
    ) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @Transactional
    public UserDTO save(UserToSaveDTO dto) {
        User entity = userMapper.toSaveEntity(dto);
        User saved = userService.save(entity);
        return userMapper.toDto(saved);
    }

    @Transactional
    public UserDTO update(UserToUpdateDTO dto) {
        User entity = userMapper.toUpdateEntity(dto);
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

    @Transactional
    public void delete(Long id) {
        userService.delete(id);
    }
}