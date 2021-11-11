import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { DataTablesModule } from 'angular-datatables';
import { PaymentgetwayListComponent } from './components/paymentgetway-list/paymentgetway-list.component';
import { PaymentgetwayCreateComponent } from './components/paymentgetway-create/paymentgetway-create.component';
import { PaymentgetwatEditComponent } from './components/paymentgetwat-edit/paymentgetwat-edit.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderCreateComponent } from './components/order-create/order-create.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CustomerListComponent,
    CustomerCreateComponent,
    CustomerEditComponent,
    PaymentgetwayListComponent,
    PaymentgetwayCreateComponent,
    PaymentgetwatEditComponent,
    ProductCreateComponent,
    ProductListComponent,
    ProductEditComponent,
    OrderListComponent,
    OrderCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
