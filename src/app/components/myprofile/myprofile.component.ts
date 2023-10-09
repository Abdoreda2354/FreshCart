import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { SettingService } from 'src/app/Services/setting.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent {
constructor(private _SettingService:SettingService){}
profileDetails:any[]=[];
results:BehaviorSubject<number>=new BehaviorSubject(0);
result:number=0;
successMess:string='';
isLoading:boolean=false;
myProfile:FormGroup = new FormGroup({
  name:new FormControl('' ,[Validators.required]),
  details:new FormControl('' ,[Validators.required]),
  phone:new FormControl('' ,[Validators.required]),
  city:new FormControl('' ,[Validators.required])
})
ngOnInit(): void {
  this.results.subscribe({
    next:(id)=>{
      this.result=id;
    }
   })

this._SettingService.getAddress().subscribe({
  next:(response)=>{
    this.results.next(response.results)
    this.profileDetails= response.data;
    
  }
})
  
}

addAddress():void{

  if (this.myProfile.valid) {
    this.isLoading=true
    this._SettingService.addAddress(this.myProfile.value).subscribe({
      next:(response)=>{
        this.results.next(response.data.length);
        this.profileDetails=response.data
        this.successMess=response.message 
      this.isLoading=false;
      },error:()=>{
      this.isLoading=false;
      }
    })
    
  }
}

remove(id:string):void{
  this._SettingService.removeAddress(id).subscribe({
    next:(response)=>{
      this.results.next(response.data.length);
    this.profileDetails= response.data;
    }
  })

}
}
