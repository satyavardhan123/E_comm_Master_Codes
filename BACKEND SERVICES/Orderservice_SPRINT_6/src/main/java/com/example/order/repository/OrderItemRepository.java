package com.example.order.repository;

import com.example.order.model.Order;
import com.example.order.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    List<OrderItem> findByOrder(Order order);

    List<OrderItem> findBySellerEmailID(String sellerEmailID);

}
