import { Component } from '@angular/core';
import { GetDataService } from 'src/app/Services/get-data.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
constructor(private _GetDataService:GetDataService){}
brands:any[]=[]
ngOnInit(): void {
this._GetDataService.getBrands().subscribe({
  next:(response)=>{
    this.brands = response.data;
    console.log(this.brands);
    
  }
})
  
}
}
