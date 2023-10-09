import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SettingService } from 'src/app/Services/setting.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent {
errMessage:string=''
sucsessMessage:string=''
isLoading:boolean=false;
visible:boolean=false;
changeType:boolean=false;
visible1:boolean=false;
changeType1:boolean=false;
visible2:boolean=false;
changeType2:boolean=false;
  constructor(private _SettingService:SettingService , private _Router:Router , private _ToastrService:ToastrService){}

  changePassword:FormGroup = new FormGroup({
    currentPassword: new FormControl('' , [Validators.required]),
    password: new FormControl('',[Validators.required , Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]{5,8}$/)]),
    rePassword: new FormControl('',[Validators.required , Validators.pattern(/^\w{6,}$/)])
  }, {validators:[this.confirmPassword] }as FormControlOptions)

  change(){
    if (this.changePassword.valid) {
      this.isLoading=true
      this._SettingService.changePassword(this.changePassword.value).subscribe({
        next:(response)=>{
          console.log(response);
          
            localStorage.removeItem('_token')
            localStorage.setItem('_token' ,response.token ) 
            this._ToastrService.success("The password has been changed successfully")
            this._Router.navigate(['/home'])
            this.isLoading=false
          
        },error:(err)=>{
      this.isLoading=false
          this.errMessage=err.error.errors.msg
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
  viewPass1():void{
    this.visible1=!this.visible1
    this.changeType1=!this.changeType1
  }
  viewPass2():void{
    this.visible2=!this.visible2
    this.changeType2=!this.changeType2
  }
}
