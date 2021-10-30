package br.com.dgusto.facade.client;

import br.com.dgusto.domain.Address;
import br.com.dgusto.domain.Client;
import br.com.dgusto.domain.Product;
import br.com.dgusto.domain.Request;
import br.com.dgusto.domain.RequestItem;
import br.com.dgusto.domain.enumeration.RequestStatus;
import br.com.dgusto.facade.dto.request.RequestDTO;
import br.com.dgusto.facade.dto.request.RequestToClientSaveDTO;
import br.com.dgusto.facade.dto.request.RequestToGetAllDTO;
import br.com.dgusto.facade.dto.request.RequestToGetDTO;
import br.com.dgusto.facade.mapper.RequestMapper;
import br.com.dgusto.security.SecurityUtils;
import br.com.dgusto.service.AddressService;
import br.com.dgusto.service.ClientService;
import br.com.dgusto.service.ProductService;
import br.com.dgusto.service.RequestItemService;
import br.com.dgusto.service.RequestService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RequestClientFacade {

    private final RequestService requestService;
    private final RequestMapper requestMapper;

    private final ClientService clientService;
    private final AddressService addressService;
    private final RequestItemService requestItemService;
    private final ProductService productService;

    public RequestClientFacade(
        RequestService requestService,
        RequestMapper requestMapper,
        ClientService clientService,
        AddressService addressService,
        RequestItemService requestItemService,
        ProductService productService
    ) {
        this.requestService = requestService;
        this.requestMapper = requestMapper;
        this.clientService = clientService;
        this.addressService = addressService;
        this.requestItemService = requestItemService;
        this.productService = productService;
    }

    @Transactional
    public RequestDTO save(RequestToClientSaveDTO dto) {
        Request entity = requestMapper.toClientSaveEntity(dto);

        Address address = entity.getAddress().getId() != null
            ? addressService.get(entity.getAddress().getId())
            : addressService.save(entity.getAddress());

        Client client = clientService.findById(entity.getClient().getId());

        Set<RequestItem> requestedItems = entity.getRequestItems().stream()
            .peek(it -> {
                Product product = productService.get(it.getProduct().getId());
                it.setProduct(product);
                it.setUnitValue(product.getUnitValue());
                it.setTotalValue(product.getUnitValue().multiply(BigDecimal.valueOf(it.getQuantity())));
            }).collect(Collectors.toSet());

        entity.setStatus(RequestStatus.REQUESTED);
        entity.setOrderDate(LocalDateTime.now());
        entity.setOrderNumber(getOrderNumber());
        entity.setTotalValue(requestedItems.stream().map(RequestItem::getTotalValue).reduce(BigDecimal.ZERO, BigDecimal::add));
        entity.setAddress(address);
        entity.setClient(client);

        Request saved = requestService.save(entity);

        requestedItems.forEach(it -> {
            it.setRequest(saved);
            requestItemService.save(it);
        });

        return requestMapper.toDto(saved);
    }

    @Transactional
    public RequestDTO update(Long requestId) {

        String userLogin = SecurityUtils.getCurrentUserLogin();
        Client client = clientService.findByUserLogin(userLogin);

        Request updated = requestService.clientUpdate(client.getId(), requestId);
        return requestMapper.toDto(updated);
    }

    @Transactional(readOnly = true)
    public RequestToGetDTO get(Long requestId) {

        String userLogin = SecurityUtils.getCurrentUserLogin();
        Client client = clientService.findByUserLogin(userLogin);

        Request request = requestService.clientGet(client.getId(), requestId);
        return requestMapper.toGetDto(request);
    }

    @Transactional(readOnly = true)
    public Page<RequestToGetAllDTO> getAll(Pageable pageable) {

        String userLogin = SecurityUtils.getCurrentUserLogin();
        Client client = clientService.findByUserLogin(userLogin);

        return requestService.clientGetAll(client.getId(), pageable)
            .map(requestMapper::toGetAllDto);
    }

    private String getOrderNumber() {
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 10;
        Random random = new Random();

        return random.ints(leftLimit, rightLimit + 1)
            .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
            .limit(targetStringLength)
            .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
            .toString();
    }
}
