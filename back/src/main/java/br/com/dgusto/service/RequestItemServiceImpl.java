package br.com.dgusto.service;

import br.com.dgusto.domain.RequestItem;
import br.com.dgusto.repository.RequestItemRepository;
import org.springframework.stereotype.Service;

@Service
public class RequestItemServiceImpl implements RequestItemService {

    private final RequestItemRepository requestItemRepository;

    public RequestItemServiceImpl(RequestItemRepository requestItemRepository) {
        this.requestItemRepository = requestItemRepository;
    }

    @Override
    public RequestItem save(RequestItem item) {
        return requestItemRepository.save(item);
    }
}
