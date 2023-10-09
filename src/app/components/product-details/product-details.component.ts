import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from 'src/app/Services/get-data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
constructor( private _WishlistService:WishlistService ,private _ActivatedRoute:ActivatedRoute , private _GetDataService:GetDataService, private _CartService:CartService , private _ToastrService:ToastrService){}
productId:any;
detailsData:any={}
wishlist:string[]=[]

ngOnInit(): void {  
  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
      this.productId = params.get('id');
    }
  })

this._GetDataService.homeDataDetails(this.productId).subscribe({
next:(response)=>{
  console.log(response.data);
  
  this.detailsData=response.data;

}
})
this._WishlistService.getWishlist().subscribe({
  next:(response)=>{
  const wish = response.data.map((item:any)=> item._id)
  this.wishlist=wish
  }
})
}

Addtocart(id:string){
  this._CartService.addToCart(id).subscribe({
    next:(response)=>{
      console.log(response);
      this.showSuccess()
      
    }
  })
}
customOptions: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  autoplay:true,
  autoplaySpeed:1000,
  items:1,
  nav: false
}
addtowish(id:any){
  this._WishlistService.addWishlist(id).subscribe({
    next:(response)=>{      
      this._WishlistService.wishCount.next(response.data.length)
      this.wishlist =response.data
      this._ToastrService.success(response.message);
    }
  })
}

removewish(id:string){
  this._WishlistService.removeWishlist(id).subscribe({
    next:(response)=>{
      this._WishlistService.wishCount.next(response.data.length)
      this.wishlist =response.data
      this._ToastrService.success(response.message);

    }
  })
}
showSuccess(){
  this._ToastrService.success('The product has been added successfully' );
}
}
