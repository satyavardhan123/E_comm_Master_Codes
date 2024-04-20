import { Component,OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentDto } from '../payment-dto';
import { BuyerDto } from '../buyer-dto';
import Swal from 'sweetalert2';
import { PaymentService } from '../payment.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  checkoutForm!: FormGroup ;
 
  


  months: string[] = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  years: number[] = [];
  

  
  totalCartValue!: number ;
  payment: PaymentDto = new PaymentDto();
  buyerDto: BuyerDto = new BuyerDto();
 
  // constructor(private route: ActivatedRoute, private paymentService: PaymentService) {
    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private paymentService: PaymentService, private router: Router) { 
      const currentYear = new Date().getFullYear();
      const range = 13;
      for (let i = 0; i < range; i++) {
        this.years.push(currentYear + i);
      }

    const totalPriceData = localStorage.getItem('totalPrice');
    const email = localStorage.getItem('email');
    }
    // // Dynamically generate years
    // const currentYear = new Date().getFullYear();
    // const range = 13; 
    // for (let i = 0; i < range; i++) {
    //   this.years.push(currentYear + i);
    // }
   


ngOnInit() {
  this.buyerDto = JSON.parse(localStorage.getItem('buyerDto') || '{}');
  
  const totalPriceData = localStorage.getItem('totalPrice');
  if (totalPriceData) {
    this.totalCartValue = JSON.parse(totalPriceData);
  }



  this.checkoutForm = this.formBuilder.group({
    name: ['', Validators.required],
    cardNumber: ['', [Validators.required]],
    CVV: ['', [Validators.required,]],
    address: ['', Validators.required],
    phoneNo: ['', Validators.required],
    
    
  });


}



makePayment() {
  this.paymentService.addPayment(this.payment).subscribe(
    (response) => {
      // Handle success
      console.log("Payment successful");
    },
    (error) => {
      // Handle error
      console.error("Error occurred during payment:", error);
    }
  );
}

onSubmit(): void {
  this.buyerDto = JSON.parse(localStorage.getItem('buyerDto') || '{}');
  if (this.checkoutForm.valid) {
    const paymentData: PaymentDto = {
      paymentId: 0,
      name: this.checkoutForm.value.name,
      email: this.buyerDto.email,
      address: this.checkoutForm.value.address,
      phoneNo: this.checkoutForm.value.phoneNo,
      totalCartValue: this.totalCartValue,
     
    };
    this.paymentService.addPayment(paymentData).subscribe(() => {
      //alert('Payment done');
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to pay!",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Payment !",
            text: "Payment Done.",
            icon: "success"
          });
          this.router.navigate(['/confirmpage']); }
      });
     
    },
    
  );
} else {
  // Form is invalid
  alert('Payment Failed.');
}}}