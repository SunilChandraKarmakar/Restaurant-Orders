import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { OrderCreateComponent } from './components/order-create/order-create.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { PaymentgetwatEditComponent } from './components/paymentgetwat-edit/paymentgetwat-edit.component';
import { PaymentgetwayCreateComponent } from './components/paymentgetway-create/paymentgetway-create.component';
import { PaymentgetwayListComponent } from './components/paymentgetway-list/paymentgetway-list.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  { path: '', component : HomepageComponent, pathMatch: 'full' },
  { path: 'home', component : HomepageComponent, pathMatch: 'full' },

  { path: 'customers', component : CustomerListComponent, pathMatch: 'full' },
  { path: 'customer/create', component : CustomerCreateComponent },
  { path: 'customer/edit/:id', component : CustomerEditComponent },

  { path: 'paymentgetways', component : PaymentgetwayListComponent, pathMatch: 'full' },
  { path: 'paymentgetway/create', component : PaymentgetwayCreateComponent },
  { path: 'paymentgetway/edit/:id', component : PaymentgetwatEditComponent },

  { path: 'products', component : ProductListComponent, pathMatch: 'full' },
  { path: 'product/create', component : ProductCreateComponent },
  { path: 'product/edit/:id', component : ProductEditComponent },

  { path: 'orders', component : OrderListComponent, pathMatch: 'full' },
  { path: 'order/create', component : OrderCreateComponent },
  // { path: 'product/edit/:id', component : ProductEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
