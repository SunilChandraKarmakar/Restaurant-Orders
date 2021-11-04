import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PaymentgetwatEditComponent } from './components/paymentgetwat-edit/paymentgetwat-edit.component';
import { PaymentgetwayCreateComponent } from './components/paymentgetway-create/paymentgetway-create.component';
import { PaymentgetwayListComponent } from './components/paymentgetway-list/paymentgetway-list.component';

const routes: Routes = [
  { path: '', component : HomepageComponent, pathMatch: 'full' },
  { path: 'home', component : HomepageComponent, pathMatch: 'full' },

  { path: 'customers', component : CustomerListComponent, pathMatch: 'full' },
  { path: 'customer/create', component : CustomerCreateComponent },
  { path: 'customer/edit/:id', component : CustomerEditComponent },

  { path: 'paymentgetways', component : PaymentgetwayListComponent, pathMatch: 'full' },
  { path: 'paymentgetway/create', component : PaymentgetwayCreateComponent },
  { path: 'paymentgetway/edit/:id', component : PaymentgetwatEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
