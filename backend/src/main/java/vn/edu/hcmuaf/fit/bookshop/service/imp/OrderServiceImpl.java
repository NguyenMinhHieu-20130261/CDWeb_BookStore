package vn.edu.hcmuaf.fit.bookshop.service.imp;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.bookshop.entity.Order;
import vn.edu.hcmuaf.fit.bookshop.entity.Review;
import vn.edu.hcmuaf.fit.bookshop.repository.OrderRepo;
import vn.edu.hcmuaf.fit.bookshop.service.OrderService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepo orderRepo;

    public List<Order> getOrdersByUser_Id(Integer userId, String sort) {
        Sort orderSort;
        if ("oldest".equalsIgnoreCase(sort)) {
            orderSort = Sort.by(Sort.Direction.ASC, "orderDate");
        } else {
            orderSort = Sort.by(Sort.Direction.DESC, "orderDate");
        }
        return orderRepo.findByUser_Id(userId, orderSort);
    }
}
