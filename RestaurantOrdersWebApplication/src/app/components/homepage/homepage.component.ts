import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentgetwayService } from 'src/app/services/paymentgetway.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {

  totalCustomer: number;
  totalPaymentGetway: number;
  totalProduct: number;
  constructor(private _customerService: CustomerService, private _paymentGetwayService: PaymentgetwayService, private _productService: ProductService) { }

  ngOnInit() {
    this._customerService.getCustomers().subscribe((res) => {
      this.totalCustomer = res.length;
    });

    this._paymentGetwayService.getPaymentGetways().subscribe((res) => {
      this.totalPaymentGetway = res.length;
    });

    this._productService.getProducts().subscribe((res) => {
      this.totalProduct = res.length;
    });
  }

}
