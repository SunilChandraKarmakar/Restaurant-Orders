import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerViewModel } from 'src/app/models/customer/CustomerViewModel';
import { OrderDetailsViewModel } from 'src/app/models/orderdetails/OrderDetailsViewModel';
import { PaymentGetwayViewModel } from 'src/app/models/paymentgetway/PaymentGetwayViewModel';
import { ProductViewModel } from 'src/app/models/product/ProductViewModel';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentgetwayService } from 'src/app/services/paymentgetway.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {

  private _orderId : number;
  orderEditForm: FormGroup;
  orderDetailsEditForm: FormGroup;
  paymentGetways: PaymentGetwayViewModel[] = [];
  customers: CustomerViewModel[] = [];
  products: ProductViewModel[] = [];
  orderDetails: OrderDetailsViewModel[] = [];

  constructor(private _orderService: OrderService, private _activatedRoute: ActivatedRoute, private _orderFormBuilder: FormBuilder, private _orderDetailsFormBuilder: FormBuilder, private _router: Router, private _toastr: ToastrService, private _paymentGetwayService: PaymentgetwayService, private _customerService: CustomerService, private _productService: ProductService) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this._orderId = params['id'];
    });

    this.getPaymentGetways();
    this.getCustomers();
    this.getProducts();

    this.orderEditForm = this._orderFormBuilder.group({
      orderNumber: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]),
      customerId: new FormControl('', Validators.required),
      paymentGetwayId: new FormControl('', Validators.required),
      totalPrice: new FormControl('', Validators.required)
    });

    this.orderDetailsEditForm = this._orderDetailsFormBuilder.group({
      id: new FormControl(),
      productId: new FormControl('', Validators.required),
      productName: new FormControl(''),
      price: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      totalOrderPrice: new FormControl(null, Validators.required),
    });

    this._orderService.getOrder(this._orderId).subscribe((res) => {
      this.orderEditForm.patchValue(res);
      //this.orderDetails = res.orderDetails;
      console.log('Order Details : ', this.orderDetails);
    });

    this.productPriceCalculation();
  }

  get orderNumber() {
    return this.orderEditForm.controls.orderNumber;
  }

  get customerId() {
    return this.orderEditForm.controls.customerId;
  }

  get paymentGetwayId() {
    return this.orderEditForm.controls.paymentGetwayId;
  }

  get totalPrice() {
    return this.orderEditForm.controls.totalPrice;
  }

  get productId() {
    return this.orderDetailsEditForm.controls.productId;
  }

  get price() {
    return this.orderDetailsEditForm.controls.price;
  }

  get quantity() {
    return this.orderDetailsEditForm.controls.quantity;
  }

  get totalOrderPrice() {
    return this.orderDetailsEditForm.controls.totalOrderPrice;
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

  private productPriceCalculation(): void {
    this.productId.valueChanges.subscribe((res) => {
      let productDetails: ProductViewModel = this.products.find(p => p.id == res)!;

      if(productDetails != undefined) {
        this.orderDetailsEditForm.patchValue({
          productName: productDetails.name,
          price: productDetails.price
        })
      }
      else {
        this.orderDetailsEditForm.patchValue({
          price: null
        })
      }
    });

    this.quantity.valueChanges.subscribe((res) => {
      let totalProductPrice: number = this.price.value * res;

      this.orderDetailsEditForm.patchValue({
        totalOrderPrice: totalProductPrice
      });
    })
  }

}
