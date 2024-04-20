import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountService } from 'src/app/service/count.service';
import { Order } from 'src/app/model/order.model';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  productCount:number;
  sellerCount:number;
  buyerCount:number;
  orderCount:number;

  
  
  orderDto: Order[] = [];
  totalRevenue: number = 0;
  currentDate:String;

  constructor(private service:CountService,private orderservice:OrderService){}
  ngOnInit(): void {
    this.getAllOrders();
    this.getProductCount();
    this.getSellerCount();
    this.getBuyerCount();
    this.getOrderCount();
    this.getCurrentDate();
  }

  getProductCount(): any {
    this.service.getProductCount().subscribe(
      (count: number) => {
        this.productCount = count;
      },
      (error: any) => {
        console.error('Error fetching product count:', error);
      }
    );
  }

  getSellerCount(): any {
    this.service.getSellerCount().subscribe(
      (count: number) => {
        this.sellerCount = count;
      },
      (error: any) => {
        console.error('Error fetching seller count:', error);
      }
    );
  }
  getBuyerCount(): any {
    this.service.getBuyerCount().subscribe(
      (count: number) => {
        this.buyerCount = count;
      },
      (error: any) => {
        console.error('Error fetching Buyer count:', error);
      }
    );
  }

  getOrderCount():any{
    this.service.getOrderCount().subscribe(
      (count: number) => {
        this.orderCount = count;
      },
      (error: any) => {
        console.error('Error fetching Order count:', error);
      }
    );
  }

  getAllOrders() {
    this.orderservice.getAllOrders().subscribe(
      (orders: Order[]) => {
        this.orderDto = orders;
        this.calculateTotalRevenue();
      },
      error => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  calculateTotalRevenue() {
    this.totalRevenue = this.orderDto.reduce((total, Order) => total + Order.totalOrderAmount, 0);
  }

  

  getCurrentDate(): void {
    const currentDateObj: Date = new Date();
    this.currentDate = currentDateObj.toDateString() + ' ' + currentDateObj.toLocaleTimeString();
  }
}
