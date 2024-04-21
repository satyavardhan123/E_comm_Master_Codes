package com.example.order.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "OrderItem_table")

@AllArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    private String sellerEmailID;
    private Long seller_id;
    private Long productId;
    private String productName;

    private String thumbnail;
    private double unitPrice;

    private int quantity;

    private String category;

    private String subcategory1;
     private String subcategory2;

     private int totalProductPrice;


    public OrderItem() {
        this.quantity = 0; // Set default value for quantity
    }
}
