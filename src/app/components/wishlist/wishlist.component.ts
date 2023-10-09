import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/Services/get-data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {

  homeData:any[]=[];
categories:any[]=[];
wishlist:string[]=[]

  constructor(private _GetDataService:GetDataService ,
    private _CartService:CartService,
     private _ToastrService: ToastrService,
     private _WishlistService:WishlistService
     ){}

ngOnInit(): void {
  this._WishlistService.getWishlist().subscribe({
    next:(response)=>{
      console.log(response);
      this.homeData=response.data;
      this.wishlist=response.data.map((item:any)=>item._id)
    }
  })
  this._GetDataService.getCategory().subscribe({
    next:(response)=>{
      this.categories = response.data      
    }
  })


}

Addtocart(id:string){
  this._CartService.addToCart(id).subscribe({
    next:(response)=>{
      console.log(response.numOfCartItems);
      this._CartService.cartId.next(response.numOfCartItems);
      this.showSuccess()
    }
  })
}



removewish(id:string){
  this._WishlistService.removeWishlist(id).subscribe({
    next:(response)=>{
      this.wishlist =response.data
      this._WishlistService.wishCount.next(response.data.length)
      this._ToastrService.success(response.message);
      const newProductData = this.homeData.filter((item)=>this.wishlist.includes(item._id))
      this.homeData=newProductData


    }
  })
}

showSuccess(){
  this._ToastrService.success('The product has been added successfully' );
}
}
