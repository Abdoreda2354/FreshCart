import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { CuttextPipe } from './Pips/cuttext.pipe';
import { SearchPipe } from './Pips/search.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriseComponent } from './components/categorise/categorise.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { FooterComponent } from './components/footer/footer.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { LoginComponent } from './components/login/login.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { NavAuthComponent } from './components/nav-auth/nav-auth.component';
import { NavBlankComponent } from './components/nav-blank/nav-blank.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingComponent } from './components/setting/setting.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { LoadingInterceptor } from './loading.interceptor';
import { MyhttpInterceptor } from './myhttp.interceptor';
import { HomeComponent } from './components/home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrandsComponent,
    CartComponent,
    CategoriseComponent,
    FooterComponent,
    LoginComponent,
    NavAuthComponent,
    NavBlankComponent,
    NotfoundComponent,
    ProductsComponent,
    RegisterComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    ProductDetailsComponent,
    SettingComponent,
    ForgetpasswordComponent,
    ChangepasswordComponent,
    AllordersComponent,
    MyprofileComponent,
    PaymentComponent,
    BrandDetailsComponent,
    CategoryDetailsComponent,
    WishlistComponent,
    CuttextPipe,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS , useClass:MyhttpInterceptor , multi:true},
    {provide:HTTP_INTERCEPTORS , useClass:LoadingInterceptor , multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
