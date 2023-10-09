import { Component } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { GetDataService } from 'src/app/Services/get-data.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
constructor(private _GetDataService:GetDataService , private _CartService:CartService , private _ToastrService:ToastrService , private _WishlistService:WishlistService){}

homeData:any[]=[];
categories:any[]=[];
pageSize:number=0;
currentPage:number=1
total:number=0
wishlist:string[]=[]
ngOnInit(): void {
  this._GetDataService.homeData().subscribe({
    next:(response)=>{
      this.homeData=response.data; 
      this.pageSize=response.metadata.limit; 
      this.currentPage=response.metadata.currentPage; 
      this.total=response.results;   
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
      console.log(response.numOfCartItems);
      this._CartService.cartId.next(response.numOfCartItems)
      this.showSuccess()
      
    }
  })
}
pageChanged(event:any){
this._GetDataService.homeData(event).subscribe({
  next:(response)=>{
    this.homeData=response.data; 
    this.pageSize=response.metadata.limit; 
    this.currentPage=response.metadata.currentPage; 
    this.total=response.results;   
  }
})
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
