import { Injectable } from '@angular/core';
import { PaymentDto } from './payment-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'http://localhost:9090/payment';
  private url='http://localhost:9090/buyer';

  constructor(private http: HttpClient) { }
  addPayment(payment: PaymentDto): Observable<string> {
    return this.http.post<string>(`${this.url}/payment`, payment);
  }

  getAllPayments(): Observable<PaymentDto[]> {
    return this.http.get<PaymentDto[]>(`${this.baseUrl}/paymentdetails`);
  }

  getPaymentsByEmail(email: string): Observable<PaymentDto[]> {
    return this.http.get<PaymentDto[]>(`${this.baseUrl}/paymentdetails/${email}`);
  }

}
