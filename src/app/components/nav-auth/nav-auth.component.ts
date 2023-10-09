import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav-auth',
  templateUrl: './nav-auth.component.html',
  styleUrls: ['./nav-auth.component.scss']
})
export class NavAuthComponent {

  constructor(private _Renderer2:Renderer2){}
  @ViewChild('nav') navBar!:ElementRef
@HostListener('window:scroll')
onScroll():void{
  if (scrollY>100) {
    this._Renderer2.addClass(this.navBar.nativeElement,'py-3')
    
  }else{
    this._Renderer2.removeClass(this.navBar.nativeElement,'py-3')

  }

}
}
