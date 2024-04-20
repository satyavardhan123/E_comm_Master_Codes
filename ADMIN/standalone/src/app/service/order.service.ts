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
    return this.http.get<Order[]>("http://localhost:8086/orderdetails");
  }

  updateOrderStatus(orderId: number, newStatus: string): Observable<any> {
    return this.http.put(`http://localhost:8086/orderstatus/${orderId}`, newStatus);
  }

  getOrderCountByStatus(status: string): Observable<number> {
    return this.http.get<number>(`http://localhost:8086/statuscount/${status}`);
  }

  getOrderDetailsByStatus(status: string): Observable<Order[]> {
    const url = `http://localhost:8086/getorderdetails/${status}`;
    return this.http.get<Order[]>(url);
  }
  
}
