import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  constructor(private _HttpClient:HttpClient) { }

  forgetpassword(email:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,email)
  }
  resetCode(resetCode:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,resetCode)
  }
  ResetPassword(pass:object):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,pass)
  }
  changePassword(pass:object):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,pass)
  }
  addAddress(profile:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/addresses`,profile)
  }
  getAddress():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/addresses`)
  }
  removeAddress(id:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`)
  }

  
}
