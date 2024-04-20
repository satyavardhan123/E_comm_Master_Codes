import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Seller } from 'src/app/model/seller.model';
import { SellerService } from 'src/app/service/seller.service';


@Component({
  selector: 'app-sellers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sellers.component.html',
  styleUrl: './sellers.component.css'
})
export class SellersComponent {


  sellerDto: Seller[]=[];

 
 constructor(private sellerservice:SellerService,){}
  ngOnInit():void{
   this.getAllSellers();
  // this.fetchProducts();
  }

  getAllSellers()

  {
    this.sellerservice.getAllSellers().subscribe(
      (cartItems:Seller[]) => {
        this.sellerDto =cartItems;
        console.log(cartItems);
      },
      error => {
        console.error('Error fetching cart items:', error);
      }
    );
  }




}
