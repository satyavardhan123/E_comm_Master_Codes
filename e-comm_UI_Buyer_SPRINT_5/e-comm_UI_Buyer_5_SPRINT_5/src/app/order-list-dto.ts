

export interface OrderDto {
    orderId: number;
    paymentId: number;
 
    buyerName: string;
    email: string;
    deliveryAddress: string;
    phoneNo: number;
    items: OrderItemDto[];
    totalOrderAmount: number;
    status: string;
  }
  
  export interface OrderItemDto {
    itemId: number;
    sellerEmailID: string;
    seller_id: number;
    productId: number;
    productName: string;
    thumbnail: string;
    unitPrice: number;
    quantity: number;
    category: string;
    subcategory1: string;
    subcategory2: string;
    totalProductPrice:number;
  }
  
