import { Component } from '@angular/core';
import{MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Seller } from 'src/app/model/seller.model';
import { Product } from 'src/app/model/product.model';

import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  
  standalone:true;
  imports:[CommonModule,MatTableModule]
  productDetails : Product[]=[];
 


  constructor(private productservice:ProductService,){}
  ngOnInit():void{
   this.getAllProducts();
  // this.fetchProducts();
  }

  getAllProducts()

  {
    this.productservice.getAllProducts().subscribe(
      (cartItems:Product[]) => {
        this.productDetails =cartItems;
        console.log(cartItems);
      },
      error => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

}
