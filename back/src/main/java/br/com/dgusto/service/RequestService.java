package br.com.dgusto.service;

import br.com.dgusto.domain.Request;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RequestService {

    Request save(Request request);

    Request update(Request request);

    Request get(Long id);

    Page<Request> getAll(Pageable pageable);

    Request clientUpdate(Long clientId, Long requestId);

    Request clientGet(Long clientId, Long requestId);

    Page<Request> clientGetAll(Long clientId, Pageable pageable);
}
