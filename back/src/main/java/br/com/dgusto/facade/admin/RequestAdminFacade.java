package br.com.dgusto.facade.admin;

import br.com.dgusto.domain.Request;
import br.com.dgusto.facade.dto.request.RequestDTO;
import br.com.dgusto.facade.dto.request.RequestToAdminUpdateDTO;
import br.com.dgusto.facade.dto.request.RequestToGetAllDTO;
import br.com.dgusto.facade.dto.request.RequestToGetDTO;
import br.com.dgusto.facade.mapper.RequestMapper;
import br.com.dgusto.service.RequestService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RequestAdminFacade {

    private final RequestService requestService;
    private final RequestMapper requestMapper;

    public RequestAdminFacade(
            RequestService requestService,
            RequestMapper requestMapper
    ) {
        this.requestService = requestService;
        this.requestMapper = requestMapper;
    }
    @Transactional
    public RequestDTO update(RequestToAdminUpdateDTO dto) {
        Request entity = requestMapper.toAdminUpdateEntity(dto);
        Request updated = requestService.update(entity);
        return requestMapper.toDto(updated);
    }

    @Transactional(readOnly = true)
    public RequestToGetDTO get(Long id) {
        Request request = requestService.get(id);
        return requestMapper.toGetDto(request);
    }

    @Transactional(readOnly = true)
    public Page<RequestToGetAllDTO> getAll(Pageable pageable) {
        return requestService.getAll(pageable)
                .map(requestMapper::toGetAllDto);
    }
}
