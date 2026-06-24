package vn.edu.hcmuaf.fit.bookshop.service;

import java.util.List;

import org.springframework.data.domain.Page;

import vn.edu.hcmuaf.fit.bookshop.dto.request.OrderRequest;
import vn.edu.hcmuaf.fit.bookshop.entity.Order;

public interface OrderService {
    List<Order> getOrdersByUser_Id(Integer user_Id, String sort);
    Order getOrderDetail(Integer orderId);
    Order createOrder(OrderRequest orderRequest);
    Order cancelOrder(Integer orderId);
    //
    Page<Order> getAllOrders(int page, int perPage, String sort, String order);
    Order getOrderById(Integer id);
    Order updateOrderStatus(Integer id, Integer statusId);
}

