import { Component } from '@angular/core';
import { GetDataService } from 'src/app/Services/get-data.service';

@Component({
  selector: 'app-categorise',
  templateUrl: './categorise.component.html',
  styleUrls: ['./categorise.component.scss']
})
export class CategoriseComponent {
  category:any[]=[]
constructor(private _GetDataService:GetDataService){}

ngOnInit(): void {
this._GetDataService.getCategory().subscribe({
  next:(response)=>{
    this.category =response.data;
  }
})
  
}
}
