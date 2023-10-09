import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor( private _HttpClient:HttpClient) { }

  cartId:BehaviorSubject<number>=new BehaviorSubject(0);
  addToCart(id:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
      productId: id
  }
  )
  }

  getCart():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`)
  }

  removeItmeFromCart(id:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`)
  }

  updateCart(id:string ,count:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` ,{
      count: count
    })
  }

  removCart():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart` )
  }

  payment(id:string ,details:object ):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://abdoreda2354.github.io/FreshCart`,{
      shippingAddress: details
    })
  }

  getAllOrders(id:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
  }
  
}
