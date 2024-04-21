package com.example.order.service;

import java.util.List;

import com.example.order.dto.OrderItemDto;
import org.springframework.http.ResponseEntity;

import com.example.order.dto.OrderDto;

public interface OrderService {

	ResponseEntity<String> addtoOrder(OrderDto orderDto);

	ResponseEntity<List<OrderDto>> getAllOrders();

	List<OrderDto> getOrderdetailsByEmail(String email);

	List<OrderItemDto> getDetailsBySellerEmailID(String sellerEmailID);
	ResponseEntity<String> updateOrderStatusbyAdmin(Long orderId, String newStatus);

	public int getOrderCount();

	ResponseEntity<String> createOrder(OrderDto orderDto);


	public long getCountByStatus(String status);


	List<OrderDto> getOrderDetailsByStatus(String status);
}
