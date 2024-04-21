package com.example.order.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.example.order.dto.OrderItemDto;
import com.example.order.model.OrderItem;
import com.example.order.repository.OrderItemRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.order.dto.OrderDto;
import com.example.order.model.Order;
import com.example.order.repository.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService {
	private final OrderRepository orderrepo;
	private final ModelMapper modelMapper;

	@Autowired
	public OrderServiceImpl(OrderRepository orderrepo, ModelMapper modelMapper) {
		this.orderrepo = orderrepo;
		this.modelMapper = modelMapper;
	}

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private OrderItemRepository orderItemRepository;

	@Override
	public ResponseEntity<String> createOrder(OrderDto orderDTO) {
		// Create a new Order entity and map fields from OrderDTO
		Order order = new Order();
		order.setPaymentId(orderDTO.getPaymentId());

		order.setBuyerName(orderDTO.getBuyerName());
		order.setEmail(orderDTO.getEmail());
		order.setDeliveryAddress(orderDTO.getDeliveryAddress());
		order.setPhoneNo(orderDTO.getPhoneNo());
		order.setTotalOrderAmount(orderDTO.getTotalOrderAmount());
		order.setStatus(orderDTO.getStatus());


		// Save the order entity to database
		Order savedOrder = orderRepository.save(order);

		// Create a list to hold order items
		List<OrderItem> orderItems = new ArrayList<>();

		// Iterate over each OrderItemDTO in orderDTO and map to OrderItem entity
		for (OrderItemDto itemDTO : orderDTO.getItems()) {
			OrderItem orderItem = new OrderItem();
			orderItem.setOrder(savedOrder); // Set the order reference
			orderItem.setProductId(itemDTO.getProductId());
			orderItem.setProductName(itemDTO.getProductName());
			orderItem.setThumbnail(itemDTO.getThumbnail());
			orderItem.setUnitPrice(itemDTO.getUnitPrice());
			orderItem.setQuantity(itemDTO.getQuantity());
			orderItem.setCategory(itemDTO.getCategory());
			orderItem.setSubcategory1(itemDTO.getSubcategory1());
			orderItem.setSubcategory2(itemDTO.getSubcategory2());
			orderItem.setTotalProductPrice(itemDTO.getTotalProductPrice());
			orderItem.setSeller_id(itemDTO.getSeller_id());
			orderItem.setSellerEmailID(itemDTO.getSellerEmailID());


			// Add the order item to the list
			orderItems.add(orderItem);
		}

		// Save all order items to the database
		List<OrderItem> savedOrderItems = orderItemRepository.saveAll(orderItems);

		// Map the saved order and order items back to OrderDTO
		OrderDto savedOrderDTO = new OrderDto();
		savedOrderDTO.setOrderId(savedOrder.getOrderId());
		savedOrderDTO.setPaymentId(savedOrder.getPaymentId());
		savedOrderDTO.setBuyerName(savedOrder.getBuyerName());
		savedOrderDTO.setEmail(savedOrder.getEmail());
		savedOrderDTO.setDeliveryAddress(savedOrder.getDeliveryAddress());
		savedOrderDTO.setPhoneNo(savedOrder.getPhoneNo());
		savedOrderDTO.setTotalOrderAmount(savedOrder.getTotalOrderAmount());
		savedOrderDTO.setStatus(savedOrder.getStatus());


		// Create a list to hold mapped order item DTOs
		List<OrderItemDto> savedOrderItemDTOs = new ArrayList<>();

		// Iterate over saved order items and map them to DTOs
		for (OrderItem savedItem : savedOrderItems) {
			OrderItemDto itemDTO = new OrderItemDto();
			itemDTO.setItemId(savedItem.getItemId());
			itemDTO.setOrderId(savedItem.getOrder().getOrderId());
			itemDTO.setProductId(savedItem.getProductId());
			itemDTO.setProductName(savedItem.getProductName());
			itemDTO.setThumbnail(savedItem.getThumbnail());
			itemDTO.setUnitPrice(savedItem.getUnitPrice());
			itemDTO.setQuantity(savedItem.getQuantity());
			itemDTO.setCategory(savedItem.getCategory());
			itemDTO.setSubcategory1(savedItem.getSubcategory1());
			itemDTO.setSubcategory2(savedItem.getSubcategory2());
			itemDTO.setTotalProductPrice(savedItem.getTotalProductPrice());
			itemDTO.setSeller_id(savedItem.getSeller_id());
			itemDTO.setSellerEmailID(savedItem.getSellerEmailID());

			// Add the mapped order item DTO to the list
			savedOrderItemDTOs.add(itemDTO);
		}

		// Set the list of mapped order item DTOs to the saved order DTO
		savedOrderDTO.setItems(savedOrderItemDTOs);
		updateOrderStatus(order.getOrderId(), "Payment Success");

		// Return the saved order DTO
		return ResponseEntity.status(HttpStatus.OK).body("{\"message\": \"Order Details saved\"}");
	}


    @Override
	public ResponseEntity<List<OrderDto>> getAllOrders() {
		List<Order> orders = orderRepository.findAll();
		List<OrderDto> orderDtos = orders.stream().map(order -> {
			OrderDto orderDto = new OrderDto();
			orderDto.setOrderId(order.getOrderId());
			orderDto.setPaymentId(order.getPaymentId());
			orderDto.setBuyerName(order.getBuyerName());
			orderDto.setEmail(order.getEmail());
			orderDto.setDeliveryAddress(order.getDeliveryAddress());
			orderDto.setPhoneNo(order.getPhoneNo());
			orderDto.setTotalOrderAmount(order.getTotalOrderAmount());
			orderDto.setStatus(order.getStatus());

			List<OrderItem> orderItems = orderItemRepository.findByOrder(order);
			List<OrderItemDto> orderItemDtos = orderItems.stream().map(item -> {
				OrderItemDto itemDto = new OrderItemDto();
				itemDto.setItemId(item.getItemId());
				itemDto.setOrderId(item.getOrder().getOrderId());
				itemDto.setProductId(item.getProductId());
				itemDto.setProductName(item.getProductName());
				itemDto.setThumbnail(item.getThumbnail());
				itemDto.setUnitPrice(item.getUnitPrice());
				itemDto.setQuantity(item.getQuantity());
				itemDto.setCategory(item.getCategory());
				itemDto.setSubcategory1(item.getSubcategory1());
				itemDto.setSubcategory2(item.getSubcategory2());
				itemDto.setTotalProductPrice(item.getTotalProductPrice());
				itemDto.setSeller_id(item.getSeller_id());
				itemDto.setSellerEmailID(item.getSellerEmailID());
				itemDto.setTotalProductPrice(item.getTotalProductPrice());
				return itemDto;
			}).collect(Collectors.toList());

			orderDto.setItems(orderItemDtos);
			return orderDto;
		}).collect(Collectors.toList());

		return ResponseEntity.status(HttpStatus.OK).body(orderDtos);
	}
	@Override
	public ResponseEntity<String> addtoOrder(OrderDto orderDto) {

		Order order = this.modelMapper.map(orderDto, Order.class);
		orderrepo.save(order);
		updateOrderStatus(order.getOrderId(), "Payment Success");
		return ResponseEntity.status(HttpStatus.OK).body("{\"message\": \"Order Details saved\"}");

	}

	private void updateOrderStatus(Long orderId, String newStatus) {
		Order order = orderrepo.findById(orderId).orElse(null);
		if (order != null) {
			order.setStatus(newStatus);
			orderrepo.save(order);
		}
	}


	@Override
	public List<OrderDto> getOrderdetailsByEmail(String email) {
		List<Order> orders = orderRepository.findByEmail(email);
		if (!orders.isEmpty()) {
			List<OrderDto> orderDtos = new ArrayList<>();
			for (Order order : orders) {
				OrderDto orderDto = new OrderDto();
				orderDto.setOrderId(order.getOrderId());
				orderDto.setPaymentId(order.getPaymentId());
				orderDto.setBuyerName(order.getBuyerName());
				orderDto.setEmail(order.getEmail());
				orderDto.setDeliveryAddress(order.getDeliveryAddress());
				orderDto.setPhoneNo(order.getPhoneNo());
				orderDto.setTotalOrderAmount(order.getTotalOrderAmount());
				orderDto.setStatus(order.getStatus());

				// Map OrderItem details
				List<OrderItemDto> orderItemDtos = order.getItems().stream().map(item -> {
					OrderItemDto itemDto = new OrderItemDto();

					itemDto.setItemId(item.getItemId());
					itemDto.setOrderId(item.getOrder().getOrderId());
					itemDto.setSeller_id(item.getSeller_id());
					itemDto.setSellerEmailID(item.getSellerEmailID());
					itemDto.setProductId(item.getProductId());
					itemDto.setProductName(item.getProductName());
					itemDto.setThumbnail(item.getThumbnail());
					itemDto.setUnitPrice(item.getUnitPrice());
					itemDto.setQuantity(item.getQuantity());
					itemDto.setCategory(item.getCategory());
					itemDto.setSubcategory1(item.getSubcategory1());
					itemDto.setSubcategory2(item.getSubcategory2());
					itemDto.setTotalProductPrice(item.getTotalProductPrice());
					return itemDto;
				}).collect(Collectors.toList());

				orderDto.setItems(orderItemDtos);
				orderDtos.add(orderDto);
			}
			return orderDtos;
		} else {
			return Collections.emptyList();
		}
	}

	@Override
	public List<OrderItemDto> getDetailsBySellerEmailID(String sellerEmailID) {
		// Retrieve order items based on the seller's email ID
		List<OrderItem> orderItems = orderItemRepository.findBySellerEmailID(sellerEmailID);

		// Map order item entities to order item DTOs
		return orderItems.stream().map(item -> {
			OrderItemDto itemDto = new OrderItemDto();
			itemDto.setItemId(item.getItemId());
			itemDto.setOrderId(item.getOrder().getOrderId());
			itemDto.setSeller_id(item.getSeller_id());
			itemDto.setSellerEmailID(item.getSellerEmailID());
			itemDto.setProductId(item.getProductId());
			itemDto.setProductName(item.getProductName());
			itemDto.setThumbnail(item.getThumbnail());
			itemDto.setUnitPrice(item.getUnitPrice());
			itemDto.setQuantity(item.getQuantity());
			itemDto.setCategory(item.getCategory());
			itemDto.setSubcategory1(item.getSubcategory1());
			itemDto.setSubcategory2(item.getSubcategory2());
			itemDto.setTotalProductPrice(item.getTotalProductPrice());
			return itemDto;
		}).collect(Collectors.toList());
	}
	@Override
	    public ResponseEntity<String> updateOrderStatusbyAdmin(Long orderId, String newStatus) {
	        if (newStatus.equals("Order Received") || newStatus.equals("Order Shipped") || newStatus.equals("Order Dispatched")) {
	            updateOrderStatusadmin(orderId, newStatus);
	            return ResponseEntity.status(HttpStatus.OK).body("{\"message\": \"Order status changed\"}");
	        } else {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Invalid status\"}");
	        }
	    }

	    private void updateOrderStatusadmin(Long orderId, String newStatus) {
	        Order order = orderrepo.findById(orderId).orElse(null);
	        if (order != null) {
	            order.setStatus(newStatus);
	            orderrepo.save(order);
	        }
	    }

	@Override
	public int getOrderCount() {
		List<Order> order=orderrepo.findAll();

		return order.size();
	}

	@Override
	public long getCountByStatus(String status) {
		return orderRepository.countByStatus(status);
	}


	@Override
	public List<OrderDto> getOrderDetailsByStatus(String status) {
		List<Order> orders = orderRepository.findByStatus(status);
		if (!orders.isEmpty()) {
			List<OrderDto> orderDtos = new ArrayList<>();
			for (Order order : orders) {
				OrderDto orderDto = new OrderDto();
				orderDto.setOrderId(order.getOrderId());
				orderDto.setPaymentId(order.getPaymentId());
				orderDto.setBuyerName(order.getBuyerName());
				orderDto.setEmail(order.getEmail());
				orderDto.setDeliveryAddress(order.getDeliveryAddress());
				orderDto.setPhoneNo(order.getPhoneNo());
				orderDto.setTotalOrderAmount(order.getTotalOrderAmount());
				orderDto.setStatus(order.getStatus());

				// Map OrderItem details
				List<OrderItemDto> orderItemDtos = order.getItems().stream().map(item -> {
					OrderItemDto itemDto = new OrderItemDto();

					itemDto.setItemId(item.getItemId());
					itemDto.setOrderId(item.getOrder().getOrderId());
					itemDto.setSeller_id(item.getSeller_id());
					itemDto.setSellerEmailID(item.getSellerEmailID());
					itemDto.setProductId(item.getProductId());
					itemDto.setProductName(item.getProductName());
					itemDto.setThumbnail(item.getThumbnail());
					itemDto.setUnitPrice(item.getUnitPrice());
					itemDto.setQuantity(item.getQuantity());
					itemDto.setCategory(item.getCategory());
					itemDto.setSubcategory1(item.getSubcategory1());
					itemDto.setSubcategory2(item.getSubcategory2());
					itemDto.setTotalProductPrice(item.getTotalProductPrice());
					return itemDto;
				}).collect(Collectors.toList());

				orderDto.setItems(orderItemDtos);
				orderDtos.add(orderDto);
			}
			return orderDtos;
		} else {
			return Collections.emptyList();
		}
	}


}
