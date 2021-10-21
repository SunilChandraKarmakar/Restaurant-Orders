import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerViewModel } from 'src/app/models/customer/CustomerViewModel';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customers: CustomerViewModel[] = [];
  constructor(private _customerService: CustomerService, private _toastr: ToastrService,  private _router: Router) { }

  ngOnInit() {
    this._customerService.get().subscribe((res) => {
      this.customers = res;
    });
  }

  edit(id: number) {
    if(id == null || id == 0) {
      return this._toastr.success('Customer Created Successfull', 'Successfull');
    }
    else {
      return this._router.navigate([`customer/edit/${id}`]);
    }
  }

}
