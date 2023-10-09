import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriseComponent } from './components/categorise/categorise.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { authGuard } from './auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SettingComponent } from './components/setting/setting.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { auth2Guard } from './auth2.guard';
import { WishlistComponent } from './components/wishlist/wishlist.component';



const routes: Routes = [
  {path:'', component:BlankLayoutComponent ,title:"FreshCart", children:[
  {path:'', redirectTo: 'FreshCart',pathMatch:'full'},
  {path:'home', canActivate:[authGuard],component:HomeComponent, title:'FreshCart'},
  {path:'details/:id', canActivate:[authGuard],component:ProductDetailsComponent , title:'details'},
  {path:'brands', canActivate:[authGuard], component:BrandsComponent , title:'brands'},
  {path:'brandsDetails/:id', canActivate:[authGuard], component:BrandDetailsComponent , title:'brands'},
  {path:'categoryDetails/:id', canActivate:[authGuard], component:CategoryDetailsComponent , title:'category'},
  {path:'payment/:id', canActivate:[authGuard], component:PaymentComponent , title:'payment'},
  {path:'cart',  canActivate:[authGuard],component:CartComponent , title:'cart'},
  {path:'categorise', canActivate:[authGuard], component:CategoriseComponent , title:'categorise'},
  {path:'products',  canActivate:[authGuard], component:ProductsComponent , title:'products'},
  {path:'wish',  canActivate:[authGuard], component:WishlistComponent , title:'withlist'},
  {path:'allorders',  canActivate:[authGuard], component:AllordersComponent },
  {path:'setting',  canActivate:[authGuard], component:SettingComponent , title:'setting' ,children:[
    {path:'', redirectTo: 'forget',pathMatch:'full'},
    {path:'forget',  canActivate:[authGuard], component:ForgetpasswordComponent },
    {path:'changePass',  canActivate:[authGuard], component:ChangepasswordComponent },
    {path:'update',  canActivate:[authGuard], component:MyprofileComponent },
  ]},
  ],
},

  {path:'' , component:AuthLayoutComponent,title:"FreshCart" , children:[
    {path:'login', component:LoginComponent ,canActivate:[auth2Guard] , title:'login'},
    {path:'forget', component:ForgetpasswordComponent,title:'forget password' ,canActivate:[auth2Guard] },
    {path:'register', component:RegisterComponent , title:'register' ,canActivate:[auth2Guard]},

  ]},
  {path:'**', component:NotfoundComponent , title:'NotFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
