import { Component } from '@angular/core';
import {FormControl , FormGroup , Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SettingService } from 'src/app/Services/setting.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent {
constructor(private _SettingService:SettingService , private _Router:Router , private _ToastrService:ToastrService){}
forgetpasswordvalue ={}
codesent:string='';
forgetForm:boolean =true;
restCode:boolean=false;
updatepass:boolean=false
erroMessage:string='';
userEmail:string='';
updateSuccess:string='';
nextloading:boolean=false;
confirmloading:boolean=false;
Doneloading:boolean=false;
restcode:FormGroup = new FormGroup({
  resetCode: new FormControl('' , [Validators.required , Validators.pattern(/^[0-9]{6}$/)])
})

forgotpassword:FormGroup = new FormGroup({
  email: new FormControl('' , [Validators.required , Validators.email])
})
updatepassword:FormGroup = new FormGroup({
  email: new FormControl('' , [Validators.required , Validators.email]),
  newPassword: new FormControl('',[Validators.required , Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]{5,8}$/)])
})

Next():void{
  this.forgetpasswordvalue =this.forgotpassword.value;
  this.userEmail=this.forgotpassword.value.email;
if(this.forgotpassword.valid){
  this.nextloading=true;
  this._SettingService.forgetpassword(this.forgetpasswordvalue).subscribe({
    next:(response)=>{
      
      if (response.statusMsg=="success") {
        this.codesent=response.message
        this.forgetForm=false;
        this.updatepass=false;
        this.restCode=true;

      }
      this.nextloading=false
      
    },error:(err)=>{

      this.nextloading=false
      this.erroMessage =err.error.message
    }
  })
}

}
confirm():void{
    if(this.restcode.valid){
      this.confirmloading=true;
  this._SettingService.resetCode(this.restcode.value).subscribe({
    next:(response)=>{ 
      if (response.status=="Success") {  
        this.forgetForm=false;
        this.restCode=false;
        this.updatepass=true;
        }
      this.confirmloading=false;

    },error:(err)=>{  
      this.confirmloading=false;
      this.codesent='';    
    this.erroMessage =err.error.message
    }
  })
  
}
}

Done():void{
console.log(this.updatepassword.value);
if (this.updatepassword.valid) {
  this.Doneloading=true;
  this._SettingService.ResetPassword(this.updatepassword.value).subscribe({
    next:(response)=>{
      console.log(response);
      
      localStorage.removeItem('_token')
      localStorage.setItem('_token' ,response.token )
      this._Router.navigate(['/home'])  
      this.Doneloading=false
      this.updateSuccess="The password has been changed successfully"
    },error:()=>{
      this.Doneloading=false
    }
  })
  
}
}
}
