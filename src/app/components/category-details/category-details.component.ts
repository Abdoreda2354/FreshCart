import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from 'src/app/Services/get-data.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent {
  categoryId:any='';
  categoryDetails:any={};
  constructor(private _ActivatedRoute:ActivatedRoute , private _GetDataService:GetDataService){}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(parms)=>{
        this.categoryId = parms.get('id')
        console.log(this.categoryId);
        
        
      }
    })
    

    this._GetDataService.getCategoryDetails(this.categoryId).subscribe({
      next:(response)=>{
        this.categoryDetails= response.data;
      }
    })
  }
}
