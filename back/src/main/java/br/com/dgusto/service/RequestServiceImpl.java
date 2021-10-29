package br.com.dgusto.service;

import br.com.dgusto.domain.Request;
import br.com.dgusto.repository.RequestRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class RequestServiceImpl implements RequestService {

    private final RequestRepository requestRepository;

    public RequestServiceImpl(
        RequestRepository requestRepository
    ) {
        this.requestRepository = requestRepository;
    }

    @Override
    public Request update(Request request) {
        return requestRepository.findById(request.getId())
            .map(it  -> {
                it.setStatus(request.getStatus());
                return it;
            }).map(requestRepository::save)
            .orElseThrow();
    }

    @Override
    public Request get(Long id) {
        return requestRepository.findById(id)
            .orElseThrow();
    }

    @Override
    public Page<Request> getAll(Pageable pageable) {
        return requestRepository.findAll(pageable);
    }
}
