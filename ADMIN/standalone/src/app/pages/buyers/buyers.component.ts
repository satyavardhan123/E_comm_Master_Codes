import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Buyer } from 'src/app/model/buyer.model';
import { BuyerService } from 'src/app/service/buyer.service';

@Component({
  selector: 'app-buyers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buyers.component.html',
  styleUrl: './buyers.component.css'
})
export class BuyersComponent {

  buyerDto:Buyer[]=[];

  
 constructor(private sellerservice:BuyerService,){}
 ngOnInit():void{
  this.getAllSellers();
 // this.fetchProducts();
 }

 getAllSellers()

 {
   this.sellerservice.getAllBuyer().subscribe(
     (cartItems:Buyer[]) => {
       this.buyerDto =cartItems;
       console.log(cartItems);
     },
     error => {
       console.error('Error fetching cart items:', error);
     }
   );
 }



}
