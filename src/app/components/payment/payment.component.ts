import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  cartId:any='';
  isLoading:boolean=false;
constructor(private _CartService:CartService , private _ActivatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(parms)=>{
       this.cartId= parms.get('id')
      }
    })
  }

payment:FormGroup =new FormGroup({
  details: new FormControl('',[Validators.required , Validators.minLength(3)]),
  phone: new FormControl('', [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  city: new FormControl('' , [Validators.required , Validators.minLength(3)])
})

Pay():void{
  const cartdetails = this.payment.value;
  if (this.payment.valid) {
    this.isLoading=true
    this._CartService.payment(this.cartId ,cartdetails ).subscribe({
      next:(response)=>{
        console.log(response);
        console.log(this.cartId);
      this.isLoading=false
        window.open(response.session.url , '_self')
      },error:()=>{
      this.isLoading=false

      }
  
    })
    
  }
  
}
}
