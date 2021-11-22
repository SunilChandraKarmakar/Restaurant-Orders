import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerViewModel } from 'src/app/models/customer/CustomerViewModel';
import { OrderViewModel } from 'src/app/models/order/OrderViewModel';
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

  orderEditForm: FormGroup;
  orderDetailsEditForm: FormGroup;

  private _orderId: number | undefined;
  paymentGetways: PaymentGetwayViewModel[] = [];
  customers: CustomerViewModel[] = [];
  products: ProductViewModel[] = [];

  orderEditModel: OrderViewModel = new OrderViewModel();

  constructor(private _orderService: OrderService, private _orderFormBuilder: FormBuilder, private _paymentGetwayService: PaymentgetwayService, private _orderDetailsFormBuilder: FormBuilder, private _customerService: CustomerService, private _productService: ProductService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this._orderId = params['id'];
    });

    this.getPaymentGetways();
    this.getCustomers();
    this.getProducts();

    this.orderEditForm = this._orderFormBuilder.group({
      orderNumber: new FormControl([Validators.required, Validators.minLength(7), Validators.maxLength(7)]),
      customerId: new FormControl('', Validators.required),
      paymentGetwayId: new FormControl('', Validators.required),
      totalPrice: new FormControl('', Validators.required)
    });

    this.orderDetailsEditForm = this._orderDetailsFormBuilder.group({
      productId: new FormControl('', Validators.required),
      price: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      totalOrderPrice: new FormControl(null, Validators.required),
    });

    this._orderService.getOrder(this._orderId!).subscribe((res) => {
      this.orderEditModel = res;
      this.orderEditForm.patchValue(res);
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

  deleteOrderDetails(id: number): void {
    let orderDetailsInfo: OrderDetailsViewModel = this.orderEditModel.orderDetails.find(od => od.id == id)!;
    let index: number = this.orderEditModel.orderDetails.indexOf(orderDetailsInfo);

    if (index !== -1) {
      this.orderEditModel.orderDetails.splice(index, 1);
    }   

    this.orderEditForm.patchValue({
      totalPrice: this.calculateTotalPriceOfOrder()
    });
  }

  private calculateTotalPriceOfOrder(): number {
    let totalPrice: number = 0;

    this.orderEditModel.orderDetails.forEach((item: any) => {
      totalPrice = (item.product.price * item.quantity) + totalPrice;
    });

    return totalPrice;
  }

  private productPriceCalculation(): void {
    this.productId.valueChanges.subscribe((res) => {
      let productDetails: ProductViewModel = this.products.find(p => p.id == res)!;

      if(productDetails != undefined) {
        this.orderDetailsEditForm.patchValue({
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
  
  updateOrderDetails(): void {
    
  }

  closeOrderDetails(): void {
    this.orderDetailsEditForm.reset();
    this.orderDetailsEditForm.patchValue({
      productId: ''
    })
  }

}
