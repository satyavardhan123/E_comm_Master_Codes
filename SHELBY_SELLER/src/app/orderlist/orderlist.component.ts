import { Component, OnInit } from '@angular/core';
import { Register } from '../model/register.model';
import { Order, OrderItem } from '../model/order.model';
import { OrderService } from '../service/order.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';



@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {

  totalRevenue=0;
  registerDto!: Register;
 
  itemDetails:OrderItem[]=[];
  displayedColumns: string[] = ['ORDERID','ProductID','P_NAME','PRICE','QTY','CATEGORY','TOTAL_P_PRICE','STATUS'];
  

  ngOnInit():void{
   
    this.registerDto = JSON.parse(localStorage.getItem('registerDto') || '{}');
    console.log(this.registerDto.emailID);
    this.registerDto.emailID=this.registerDto.emailID;
   this.fetchOrders();
  
  // this.fetchProducts();
  }


  constructor(private orderservice:OrderService, 
    public imagediaolog:MatDialog ,

    private router:Router){}

  
    fetchOrders() {
      this.orderservice.getOrderDetailsByEmail(this.registerDto.emailID).subscribe(
        (cartItems:OrderItem[]) => {
          this.itemDetails =cartItems;
          console.log(cartItems);
          this.calculateTotalRevenue();
        },
        error => {
          console.error('Error fetching cart items:', error);
        }
      );
    }
  
    calculateTotalRevenue() {
      this.totalRevenue = this.itemDetails.reduce((total, OrderItem) => total + OrderItem.totalProductPrice, 0);
    }

}
