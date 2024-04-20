import { Component, ElementRef, ViewChild } from '@angular/core';
import { PaymentDto } from '../payment-dto';
import { CartDto } from '../cart-dto';
import { PaymentService } from '../payment.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { ConfirmPageService } from '../confirm-page.service';
import { OrderDto, OrderItemDto } from '../order-list-dto';


@Component({
  selector: 'app-confirm-page',
  templateUrl: './confirm-page.component.html',
  styleUrls: ['./confirm-page.component.css']
})
export class ConfirmPageComponent {
  @ViewChild('confirmButton') confirmButton!: ElementRef;
  lastPayment!: PaymentDto;
  carts: CartDto[] = [];

  

  constructor( private router: Router,private paymentService: PaymentService, private cartService: CartService, private confirmpageService: ConfirmPageService) {}

  ngOnInit(): void {
    this.loadPaymentsAndCarts();

    setTimeout(() => {
      if (this.confirmButton) {
        this.confirmButton.nativeElement.click();
      }
    }, 10000000000);
    
  }

  loadPaymentsAndCarts(): void {
    const buyerDtoString = localStorage.getItem('buyerDto');
    if (buyerDtoString) {
      const buyerDto = JSON.parse(buyerDtoString);
      const email = buyerDto.email;
  
      this.paymentService.getPaymentsByEmail(email).subscribe(payments => {
        // Extract the last payment from the payments array
        this.lastPayment = payments[payments.length - 1];
        // localStorage.setItem('lastPayment', JSON.stringify(this.lastPayment));
      });
  
      this.cartService.getCartDetailsByEmail(email).subscribe(carts => {
        this.carts = carts;
        // localStorage.setItem('carts', JSON.stringify(this.carts));
      });
    } else {
      console.error('buyerDto not found in local storage');
      // Handle the case where buyerDto is not found in local storage
      // For example, you could redirect the user to a page where they can input their buyer information again
    }
  }


  confirmAllOrders(): void {
    if (this.lastPayment && this.carts.length > 0) {
      // Construct order object
      const order: OrderDto = {
        orderId: 0, // Server will generate order ID
        paymentId: this.lastPayment.paymentId,
      
        buyerName: this.lastPayment.name,
        email: this.lastPayment.email,
        deliveryAddress: this.lastPayment.address,
        phoneNo: this.lastPayment.phoneNo,
        items: [],
        totalOrderAmount: this.lastPayment.totalCartValue,
        status: 'Payment Success'
      };

      // Calculate total order amount and create order items
      for (const cart of this.carts) {
        const orderItem: OrderItemDto = {
          itemId: 0, // Server will generate item ID
          productId: cart.productId,
          productName: cart.name,
          thumbnail: cart.thumbnail,
          unitPrice: cart.price,
          quantity: cart.quantity,
          category: cart.category,
          subcategory1: cart.subcategory1,
          subcategory2: cart.subcategory2,
          sellerEmailID: cart.sellerEmailID,
          seller_id: cart.seller_id,
          totalProductPrice:cart.totalproductPrice
        };
        order.items.push(orderItem);
        
      }

      // Send order to backend
      this.confirmpageService.addOrder(order).subscribe(response => {
        console.log('Order placed successfully:', response);
      }, error => {
        console.error('Error placing order:', error);
      });
    } else {
      console.error('No payment data or carts available.');
    }

    this.deletecart();
  }

  deletecart() {
    const buyerDtoString = localStorage.getItem('buyerDto');
    if (buyerDtoString) {
      const buyerDto = JSON.parse(buyerDtoString);
      const email = buyerDto.email;
      this.cartService.deleteListOfProductsByEmail(email).subscribe(
        () => {
          console.log('Products deleted successfully from the cart after checkout');
          // Navigate to a success page or any other page after checkout
          this.router.navigate(['/orderList']);
        },
        error => {
          console.error('Error deleting products from the cart:', error);
          // Handle error deleting products from the cart
        }
      );
    } else {
      console.error('BuyerDto not found in local storage');
      // Handle the case where buyerDto is not found in local storage
    }
  }


}
