import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDto } from './order-list-dto';

@Injectable({
  providedIn: 'root'
})
export class OrderListService {

  private baseUrl = 'http://localhost:8086'; // Updated port number

  constructor(private http: HttpClient) { }


  getOrderDetailsByEmail(email: string): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${this.baseUrl}/orderdetails/${email}`);
  }
}

