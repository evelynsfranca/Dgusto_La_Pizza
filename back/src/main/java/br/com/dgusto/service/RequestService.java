package br.com.dgusto.service;

import br.com.dgusto.domain.Request;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RequestService {

    Request update(Request request);

    Request get(Long id);

    Page<Request> getAll(Pageable pageable);
}
