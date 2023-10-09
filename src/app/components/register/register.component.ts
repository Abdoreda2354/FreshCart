import { Component } from '@angular/core';
import {FormControl , FormControlOptions, FormGroup , Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userData!:object;
  isLoading:boolean=false;
  errMessage:string='';
  visible:boolean=false;
  changeType:boolean=false;
  visibleRe:boolean=false;
  changeTypeRe:boolean=false;
  constructor(private _AuthService:AuthService ,private _Router:Router , private _ToastrService:ToastrService){

  }
  registerForm:FormGroup = new FormGroup({
    name:new FormControl('' ,[Validators.required , Validators.minLength(3), Validators.maxLength(10)]),
    email:new FormControl('' , [Validators.required , Validators.email]),
    password:new FormControl('',[Validators.required , Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]{5,8}$/)] ),
    rePassword:new FormControl(''),
    phone:new FormControl('' , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, {validators:[this.confirmPassword] }as FormControlOptions);

  handleForm(){
    this.userData=this.registerForm.value;
    if (this.registerForm.valid) {
      this.isLoading=true
      this._AuthService.registerApi(this.userData).subscribe({
        next:(response)=>{
        if (response.message==='success') { 
           
          this.isLoading=false;   
          this.showSuccess()
          this._Router.navigate(['/login'])
        }
        },
        error:(err)=>{
          this.isLoading=false;
          this.errMessage=err.error.message;

          
        }
      })
    }

    
  }

  confirmPassword(group:FormGroup):void{
    const password = group.get('password');
    const rePassword = group.get('rePassword');
    if (rePassword?.value === '') {
      rePassword.setErrors({required:true})
    }
    else if(rePassword?.value !== password?.value){
      rePassword?.setErrors({mismatch:true})
    }
  }

  viewPass():void{
    this.visible=!this.visible
    this.changeType=!this.changeType
  }
  viewRePass():void{
    this.visibleRe=!this.visibleRe
    this.changeTypeRe=!this.changeTypeRe
  }

  showSuccess(){
    this._ToastrService.success('Successful register,success' );
  }
}
