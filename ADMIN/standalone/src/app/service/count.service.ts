import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountService {

  constructor(private http:HttpClient) { }

  public getProductCount():Observable<number>{
    return this.http.get<number>("http://localhost:8081/products/getcount");
  }

  public getSellerCount():Observable<number>{
    return this.http.get<number>("http://localhost:8083/seller-registrations/getcount");
  }

  public getBuyerCount():Observable<number>{
    return this.http.get<number>("http://localhost:8082/buyer/getcount");
  }
  
  public getOrderCount():Observable<number>
  {
    return this.http.get<number>("http://localhost:8086/getcount")
  }
}
