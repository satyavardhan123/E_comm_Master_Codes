package com.example.order.controller;

import java.util.List;

import com.example.order.dto.OrderItemDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.order.dto.OrderDto;
import com.example.order.service.OrderService;


@RestController
@RequestMapping("/order")
public class OrderController {
	private final OrderService orderservice;

	@Autowired
	public OrderController(OrderService orderservice) {
		this.orderservice = orderservice;

	}

	@PostMapping("/create")
	public ResponseEntity<String> createOrder(@RequestBody OrderDto orderDTO) {
		return orderservice.createOrder(orderDTO);
	}

	@GetMapping("/orderdetails")
	public ResponseEntity<List<OrderDto>> getAllOrders() {
		return orderservice.getAllOrders();
	}

	@GetMapping("/orderdetails/{email}")
	public List<OrderDto> getOrderdetailsByEmaillist(@PathVariable String email) {
		return orderservice.getOrderdetailsByEmail(email);
	}

	@GetMapping("/getorderdetails/{status}")
	public List<OrderDto> getOrderDetailsByStatus(@PathVariable String status) {
		return orderservice.getOrderDetailsByStatus(status);
	}


	@GetMapping("/sellerorderdetails/{sellerEmailID}")
	public List<OrderItemDto> getDetailsBySellerEmailID(@PathVariable String sellerEmailID) {
		return orderservice.getDetailsBySellerEmailID(sellerEmailID);
	}
	
	@PutMapping("/orderstatus/{orderId}")
	public ResponseEntity<String> updateStatus(@PathVariable Long orderId, @RequestBody String newStatus) {
	    return orderservice.updateOrderStatusbyAdmin(orderId, newStatus);
	}

	@GetMapping("/getcount")
	public int getOrderCount() {
		return orderservice.getOrderCount();
	}


	@GetMapping("/statuscount/{status}")
	public ResponseEntity<Long> getOrderCountByStatus(@PathVariable String status) {
		long count = orderservice.getCountByStatus(status);
		return ResponseEntity.ok(count);
	}
}
