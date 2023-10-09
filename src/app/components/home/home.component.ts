import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Services/cart.service';
import { GetDataService } from 'src/app/Services/get-data.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private _GetDataService:GetDataService ,
     private _CartService:CartService,
      private _ToastrService: ToastrService,
      private _WishlistService:WishlistService
      ){}

homeData:any[]=[];
categories:any[]=[];
term:string=''
wishlist:string[]=[]
ngOnInit(): void {
  this._GetDataService.homeData().subscribe({
    next:(response)=>{
      this.homeData=response.data;      
    }
  })

  this._GetDataService.getCategory().subscribe({
    next:(response)=>{
      this.categories = response.data      
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
      this._CartService.cartId.next(response.numOfCartItems);
      this.showSuccess()
    }
  })
}


customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    900: {
      items: 5
    },
    940: {
      items: 6
    }
  },
  nav: true
}
mainSlider: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  autoplay:true,
  autoplaySpeed:1000,
  navText: ['', ''],
  items:1,
  nav: true
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
