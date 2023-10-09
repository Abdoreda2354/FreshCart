import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit{
constructor(private _Router:Router , private _CartService:CartService ,private _Renderer2:Renderer2 , private _WishlistService:WishlistService){}

@ViewChild('nav') navBar!:ElementRef
@HostListener('window:scroll')
onScroll():void{
  if (scrollY>200) {
    this._Renderer2.addClass(this.navBar.nativeElement,'px-5')
    
  }else{
    this._Renderer2.removeClass(this.navBar.nativeElement,'px-5')

  }

}
wishResults:number=0;
cartCount:number=0;
ngOnInit(): void {
 this._CartService.cartId.subscribe({
  next:(id)=>{
    this.cartCount=id
  }
 })
 this._WishlistService.wishCount.subscribe({
  next:(id)=>{
this.wishResults=id
  }
 })

 this._CartService.getCart().subscribe({
  next:(response)=>{
    this._CartService.cartId.next(response.numOfCartItems)
  }
 })


 this._WishlistService.getWishlist().subscribe({
  next:(response)=>{
      this._WishlistService.wishCount.next(response.data.length)
  
  }
})
}

signout(){
  localStorage.removeItem('_token')
  this._Router.navigate(['/login'])
}
}
