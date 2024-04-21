package com.example.order.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDto {

    private Long itemId;
    private Long orderId;// This will be used to reference the order
    private String sellerEmailID;
    private Long seller_id;
    private Long productId;
    private String productName;
    private double unitPrice;

    private String thumbnail;
    private int quantity;
    private String category;
    private String subcategory1;
    private String subcategory2;
    private int totalProductPrice;
}
