import { Component } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent {
allOrders:any[]=[]
allorderslength:number=0
constructor(private _CartService:CartService){}
encode:any
  ngOnInit(): void {
    const decode = localStorage.getItem('_token')
    if (decode) {
      this.encode = jwtDecode(decode)
      
      
    }

    this._CartService.getAllOrders(this.encode.id).subscribe({
      next:(response)=>{
       this.allOrders= response;
       this.allorderslength=this.allOrders.length
      }
    })
    
  }
}
