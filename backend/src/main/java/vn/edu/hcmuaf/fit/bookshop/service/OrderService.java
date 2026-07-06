package vn.edu.hcmuaf.fit.bookshop.service;

import java.util.List;

import org.springframework.data.domain.Page;

import vn.edu.hcmuaf.fit.bookshop.dto.order.OrderRequest;
import vn.edu.hcmuaf.fit.bookshop.entity.Order;

public interface OrderService {
    //user
    List<Order> getOrdersByUser_Id(Integer user_Id, String sort);
    Order createOrder(OrderRequest orderRequest);
    Order getOrderDetailForUser(Integer orderId, Integer userId);
    Order cancelOrderForUser(Integer orderId,Integer userId);
    //admin
    Page<Order> getAllOrders(int page, int perPage, String sort, String filter, String order);
    Order getOrderById(Integer id);
    Order updateOrderStatus(Integer id, Integer statusId);
    Order updateOrder(Integer id, java.util.Map<String, Object> body);
    void deleteOrder(Integer id);
    void clearCartAfterPaymentSuccess(Integer orderId);
    Order updatePaymentFailed(Integer orderId);
}


