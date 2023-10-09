import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { SocialUser } from "@abacritt/angularx-social-login";
import { ToastrService } from 'ngx-toastr';

@Component({ 
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userData!:object;
  isLoading:boolean=false;
  errMessage:string='';
  user!: SocialUser;
  loggedIn!: boolean;
  visible:boolean=false;
  changeType:boolean=false;
  constructor(private _AuthService:AuthService ,private _Router:Router , private _ToastrService:ToastrService){

  }
  loginForm:FormGroup = new FormGroup({
    email:new FormControl('' , [Validators.required , Validators.email]),
    password:new FormControl('',[Validators.required] )
  });
  handleForm(){
    this.userData=this.loginForm.value;
    if (this.loginForm.valid) {
      this.isLoading=true
      this._AuthService.loginApi(this.userData).subscribe({
        next:(response)=>{
        if (response.message==='success') { 
          this.isLoading=false; 
          localStorage.setItem('_token' ,response.token)
          this.showSuccess()
          this._Router.navigate(['/home'])
        }
        },
        error:(err)=>{
          this.isLoading=false;
          this.errMessage=err.error.message;
        }
      })
    }

    
  }

  viewPass():void{
    this.visible=!this.visible
    this.changeType=!this.changeType
  }
  showSuccess(){
    this._ToastrService.success(`Successful Login` );
  }
}
