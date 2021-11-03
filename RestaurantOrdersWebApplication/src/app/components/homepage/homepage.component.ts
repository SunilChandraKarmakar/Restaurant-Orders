import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentgetwayService } from 'src/app/services/paymentgetway.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {

  totalCustomer: number;
  totalPaymentGetway: number;
  constructor(private _customerService: CustomerService, private _paymentGetwayService: PaymentgetwayService) { }

  ngOnInit() {
    this._customerService.getCustomers().subscribe((res) => {
      this.totalCustomer = res.length;
    });

    this._paymentGetwayService.getPaymentGetways().subscribe((res) => {
      this.totalPaymentGetway = res.length;
    });
  }

}
