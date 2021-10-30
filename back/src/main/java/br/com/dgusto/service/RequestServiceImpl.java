package br.com.dgusto.service;

import br.com.dgusto.domain.Request;
import br.com.dgusto.domain.enumeration.RequestStatus;
import br.com.dgusto.repository.RequestRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class RequestServiceImpl implements RequestService {

    private final RequestRepository requestRepository;

    public RequestServiceImpl(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    @Override
    public Request save(Request request) {
        return requestRepository.save(request);
    }

    @Override
    public Request update(Request request) {
        return requestRepository.findById(request.getId())
            .map(it  -> {
                it.setStatus(request.getStatus());
                return it;
            }).map(requestRepository::save)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.request.notFound"));
    }

    @Override
    public Request get(Long id) {
        return requestRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.request.notFound"));
    }

    @Override
    public Page<Request> getAll(Pageable pageable) {
        return requestRepository.findAll(pageable);
    }

    @Override
    public Request clientUpdate(Long clientId, Long requestId) {
        return requestRepository.findByClientIdAndRequestId(clientId, requestId)
            .map(it  -> {
                it.setStatus(RequestStatus.CANCELLED);
                return it;
            }).map(requestRepository::save)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.request.notFound"));
    }

    @Override
    public Request clientGet(Long clientId, Long requestId) {
        return requestRepository.findByClientIdAndRequestId(clientId, requestId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "error.request.notFound"));
    }

    @Override
    public Page<Request> clientGetAll(Long clientId, Pageable pageable) {
        return requestRepository.findAllClientRequests(clientId, pageable);
    }
}
