import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from 'src/app/model/order.model';
import { OrderService } from 'src/app/service/order.service';
import { OrderlistComponent } from 'src/app/components/orderlist/orderlist.component';

@Component({
  selector: 'app-ordershipped',
  standalone: true,
  imports: [CommonModule,OrderlistComponent],
  templateUrl: './ordershipped.component.html',
  styleUrl: './ordershipped.component.css'
})
export class OrdershippedComponent {

  orderDto:Order[];
  statuscount:number;
  status:string;
  constructor(private orderservice:OrderService){}

  ngOnInit():void{
    this.getOrdersReceived();
    this.getcount('order shipped');

  }
  getcount(status: string) {
    this.orderservice.getOrderCountByStatus(status).subscribe(
      (count: number) => {
        this.statuscount= count;
      },
      (error: any) => {
        console.error('Error Fetching count of orders By status', error);
      }
    )
  }
  getOrdersReceived() {
    this.orderservice.getOrderDetailsByStatus('order shipped').subscribe(
      (orders: Order[]) => {
        this.orderDto = orders;
      },
      error => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  updateOrderStatus(orderId: number, newStatus: string) {
    this.orderservice.updateOrderStatus(orderId, newStatus).subscribe(
      response => {
        console.log(response);
        // Update order status locally
        const updatedOrder = this.orderDto.find(order => order.orderId === orderId);
        if (updatedOrder) {
          updatedOrder.status = newStatus;
        }
      },
     
    );
    this.getOrdersReceived();
  }

}
