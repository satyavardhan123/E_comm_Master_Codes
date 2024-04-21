import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Buyer } from '../model/buyer.model';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {
  constructor(private http:HttpClient) { }

  public getAllBuyer(){
    return this.http.get<Buyer[]>("http://localhost:9090/buyer/registereddetails");
  }
}
