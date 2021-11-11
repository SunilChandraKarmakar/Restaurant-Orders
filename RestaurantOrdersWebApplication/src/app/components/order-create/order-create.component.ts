import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerViewModel } from 'src/app/models/customer/CustomerViewModel';
import { OrderUpsertModel } from 'src/app/models/order/OrderUpsertModel';
import { OrderDetailsUpsertModel } from 'src/app/models/orderdetails/OrderDetailsUpsertModel';
import { PaymentGetwayViewModel } from 'src/app/models/paymentgetway/PaymentGetwayViewModel';
import { ProductViewModel } from 'src/app/models/product/ProductViewModel';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentgetwayService } from 'src/app/services/paymentgetway.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})

export class OrderCreateComponent implements OnInit {

  orderCreateForm: FormGroup;
  orderDetailsCreateForm: FormGroup;
  paymentGetways: PaymentGetwayViewModel[] = [];
  customers: CustomerViewModel[] = [];
  products: ProductViewModel[] = [];
  createOrderModel: OrderUpsertModel = new OrderUpsertModel();
  createOrderDetailsModel: OrderDetailsUpsertModel = new OrderDetailsUpsertModel();

  constructor(private _orderService: OrderService, private _orderFormBuilder: FormBuilder, private _orderDetailsFormBuilder: FormBuilder, private _router: Router, private _toastr: ToastrService, private _paymentGetwayService: PaymentgetwayService, private _customerService: CustomerService, private _productService: ProductService) { }

  ngOnInit() {   
    this.getPaymentGetways();
    this.getCustomers();
    this.getProducts();

    this.orderCreateForm = this._orderFormBuilder.group({
      orderNumber: new FormControl(this.generateOrderNumber(), [Validators.required, Validators.minLength(7), Validators.maxLength(7)]),
      customerId: new FormControl('', Validators.required),
      paymentGetwayId: new FormControl('', Validators.required),
      totalPrice: new FormControl(null, Validators.required)
    });

    this.orderDetailsCreateForm = this._orderDetailsFormBuilder.group({
      productId: new FormControl('', Validators.required),
      price: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      totalOrderPrice: new FormControl(null, Validators.required),
    });

    this.getProductPriceBySelectedProduct();
  }

  get orderNumber() {
    return this.orderCreateForm.controls.orderNumber;
  }

  get customerId() {
    return this.orderCreateForm.controls.customerId;
  }

  get paymentGetwayId() {
    return this.orderCreateForm.controls.paymentGetwayId;
  }

  get totalPrice() {
    return this.orderCreateForm.controls.totalPrice;
  }

  get productId() {
    return this.orderDetailsCreateForm.controls.productId;
  }

  get price() {
    return this.orderDetailsCreateForm.controls.price;
  }

  get quantity() {
    return this.orderDetailsCreateForm.controls.quantity;
  }

  get totalOrderPrice() {
    return this.orderDetailsCreateForm.controls.totalOrderPrice;
  }

  private generateOrderNumber(): string {
    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for ( var i = 0; i < 7; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }

    return result;
  }

  saveOrder(): void {
    console.log('Model : ', this.orderCreateForm.value);
  }

  private getCustomers(): void {
    this._customerService.getCustomers().subscribe((res) => {
      this.customers = res;
    });
  }

  private getPaymentGetways(): void {
    this._paymentGetwayService.getPaymentGetways().subscribe((res) => {
      this.paymentGetways = res;
    });
  }

  private getProducts(): void {
    this._productService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }

  saveOrderDetails(): void {
    console.log('Order Details Model : ', this.orderDetailsCreateForm.value);
  }

  private getProductPriceBySelectedProduct(): void {
    this.productId.valueChanges.subscribe((res) => {
      let productDetails: ProductViewModel = this.products.find(p => p.id == res)!;

      if(productDetails != undefined) {
        this.orderDetailsCreateForm.patchValue({
          price: productDetails.price
        })
      }
      else {
        this.orderDetailsCreateForm.patchValue({
          price: null
        })
      }
    });

    this.quantity.valueChanges.subscribe((res) => {
      let productPrice = this.p
    })
  }

  closeOrderDetails(): void {
    this.orderDetailsCreateForm.reset();
  }

}
