import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from 'src/app/Services/get-data.service';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.scss']
})
export class BrandDetailsComponent {
constructor(private _ActivatedRoute:ActivatedRoute , private _GetDataService:GetDataService){}
brandId:any
brandDetails:any={}
ngOnInit(): void {
this._ActivatedRoute.paramMap.subscribe({
  next:(params)=>{
this.brandId=params.get('id')
  }
})
  

this._GetDataService.getBrandsDetails(this.brandId).subscribe({
  next:(response)=>{
    console.log(response.data);
    
    this.brandDetails =response.data;
    
  }
})
}




}
