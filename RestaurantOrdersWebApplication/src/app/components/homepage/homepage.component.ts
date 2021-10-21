import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {

  totalCustomer: number;
  constructor(private _customerService: CustomerService) { }

  ngOnInit() {
    this._customerService.getCustomers().subscribe((res) => {
      this.totalCustomer = res.length;
    });
  }

}
