import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../model/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  [x: string]: any;

  constructor(private http:HttpClient) { }

  public getAllOrders(){
    return this.http.get<Order[]>("http://localhost:9090/order/orderdetails");
  }

  updateOrderStatus(orderId: number, newStatus: string): Observable<any> {
    return this.http.put(`http://localhost:9090/order/orderstatus/${orderId}`, newStatus);
  }

  getOrderCountByStatus(status: string): Observable<number> {
    return this.http.get<number>(`http://localhost:9090/order/statuscount/${status}`);
  }

  getOrderDetailsByStatus(status: string): Observable<Order[]> {
    const url = `http://localhost:9090/order/getorderdetails/${status}`;
    return this.http.get<Order[]>(url);
  }
  
}
