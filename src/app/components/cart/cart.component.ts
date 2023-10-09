import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
constructor(private _CartService:CartService){}
cartData: any = {}
numOfCartItems:number=0;
length:number=0;


ngOnInit(): void {


  this._CartService.cartId.subscribe({
    next:(id)=>{
      this.numOfCartItems=id
    }
   })
    this._CartService.getCart().subscribe({
      next:(response)=>{
       this.cartData =response.data;
       this.numOfCartItems =response.numOfCartItems;
       this.length=this.cartData.products.length;
       
      }
    })
    
    
}


deletItem(id:string){
   this._CartService.removeItmeFromCart(id).subscribe({
    next:(response)=>{
      this.cartData = response.data;
      this._CartService.cartId.next(response.numOfCartItems)
    }
  }) 
}
removecard(){
  this._CartService.removCart().subscribe({
    next:(response)=>{
      if (response.message=='success') {
        this.cartData = {};
      this._CartService.cartId.next(0)

      }
      
      
    }
  })
}

updateItem(id:string , count:number){
  if (count!==0) {
    this._CartService.updateCart(id,count).subscribe({
      next:(response)=>{
        this.cartData = response.data;
      }
    })
  }

}



}
