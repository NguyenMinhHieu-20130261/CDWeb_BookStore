package vn.edu.hcmuaf.fit.bookshop.service;

import java.util.List;
import vn.edu.hcmuaf.fit.bookshop.entity.Order;

public interface OrderService {
    List<Order> getOrdersByUser_Id(Integer user_Id, String sort);
    Order getOrderDetail(Integer orderId);
}
