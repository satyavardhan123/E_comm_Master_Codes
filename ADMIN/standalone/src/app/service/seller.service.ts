import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seller } from '../model/seller.model';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  
  constructor(private http:HttpClient) { }

  public getAllSellers(){
    return this.http.get<Seller[]>("http://localhost:9090/seller-registrations/registereddetails");
  }
}
