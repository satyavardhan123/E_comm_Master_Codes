import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Order, OrderItem } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

 
  constructor(private http : HttpClient) { }

  getOrdersByEmail(sellerEmailID: String) {
    return this.http.get<any>(`http://localhost:9090/order/sellerorderdetails/${sellerEmailID}`).pipe(
     catchError(this.handleError)
   );
 
}

private handleError(error: any) {
  console.error('An error occurred:', error);
  return throwError(error);

  
}

getOrderDetailsByEmail(sellerEmailID: String): Observable<OrderItem[]> {
  return this.http.get<OrderItem[]>(`http://localhost:9090/order/sellerorderdetails/${sellerEmailID}`);
}
}