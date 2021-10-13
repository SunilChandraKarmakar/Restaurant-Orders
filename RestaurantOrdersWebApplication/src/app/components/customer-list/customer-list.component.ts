import { Component, OnInit } from '@angular/core';
import { CustomerViewModel } from 'src/app/models/customer/CustomerViewModel';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customers: CustomerViewModel[] = [];
  constructor(private _customerService: CustomerService) { }

  ngOnInit() {
    this._customerService.get().subscribe((res) => {
      this.customers = res;
    });
  }

}
