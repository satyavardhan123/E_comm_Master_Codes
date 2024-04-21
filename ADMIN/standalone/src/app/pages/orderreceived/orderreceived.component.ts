import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from 'src/app/model/order.model';
import { OrderService } from 'src/app/service/order.service';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { OrderlistComponent } from 'src/app/components/orderlist/orderlist.component';

@Component({
  selector: 'app-orderreceived',
  standalone: true,
  imports: [CommonModule,NavBarComponent,FooterComponent,OrderlistComponent],
  templateUrl: './orderreceived.component.html',
  styleUrl: './orderreceived.component.css'
})
export class OrderreceivedComponent {

  orderDto:Order[];
  statuscount:number;
  status:string;
  constructor(private orderservice:OrderService){}

  ngOnInit():void{
    this.getOrdersReceived();
    this.getcount('order received');

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
    this.orderservice.getOrderDetailsByStatus('order received').subscribe(
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
