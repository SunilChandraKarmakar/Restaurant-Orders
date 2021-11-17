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

  constructor(private _orderService: OrderService, private _orderFormBuilder: FormBuilder, private _orderDetailsFormBuilder: FormBuilder, private _router: Router, private _toastr: ToastrService, private _paymentGetwayService: PaymentgetwayService, private _customerService: CustomerService, private _productService: ProductService) { }

  ngOnInit() {   
    this.getPaymentGetways();
    this.getCustomers();
    this.getProducts();

    this.orderCreateForm = this._orderFormBuilder.group({
      orderNumber: new FormControl(this.generateOrderNumber(), [Validators.required, Validators.minLength(7), Validators.maxLength(7)]),
      customerId: new FormControl('', Validators.required),
      paymentGetwayId: new FormControl('', Validators.required),
      totalPrice: new FormControl('', Validators.required)
    });

    this.orderDetailsCreateForm = this._orderDetailsFormBuilder.group({
      id: new FormControl(),
      productId: new FormControl('', Validators.required),
      productName: new FormControl(''),
      price: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      totalOrderPrice: new FormControl(null, Validators.required),
    });

    this.productPriceCalculation();
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

  saveOrder(): void {
    this.createOrderModel.orderNumber = this.orderCreateForm.controls.orderNumber.value;
    this.createOrderModel.paymentGetwayId = this.orderCreateForm.controls.paymentGetwayId.value;
    this.createOrderModel.customerId = this.orderCreateForm.controls.customerId.value;
    this.createOrderModel.totalPrice = this.orderCreateForm.controls.totalPrice.value;

    this._orderService.post(this.createOrderModel).subscribe((res) => {
      this._toastr.success('Order Created Successfull', 'Successfull');
      this.orderCreateForm.reset();
      return this._router.navigate(['orders']);
    })
  }

  saveOrderDetails(): void {
    let orderDetailsId: number = this.orderDetailsCreateForm.controls.id.value;

    if(orderDetailsId == null) {
      this.increaseOrderDetailsId();
      this.createOrderModel.orderDetails.push(this.orderDetailsCreateForm.value);
    }
    else {
      let index: number = this.createOrderModel.orderDetails.findIndex(x => x.id == orderDetailsId);

      this.createOrderModel.orderDetails[index].id = this.orderDetailsCreateForm.controls.id.value;
      this.createOrderModel.orderDetails[index].price = this.orderDetailsCreateForm.controls.price.value;
      this.createOrderModel.orderDetails[index].productId = this.orderDetailsCreateForm.controls.productId.value;
      this.createOrderModel.orderDetails[index].productName = this.orderDetailsCreateForm.controls.productName.value;
      this.createOrderModel.orderDetails[index].quantity = this.orderDetailsCreateForm.controls.quantity.value;
      this.createOrderModel.orderDetails[index].totalOrderPrice = this.orderDetailsCreateForm.controls.totalOrderPrice.value;
    }

    this.orderDetailsCreateForm.reset();
    this.orderDetailsCreateForm.patchValue({
      productId: ''
    })

    this.orderCreateForm.patchValue({
      totalPrice: this.calculateTotalPriceOfOrder()
    });
  }

  private productPriceCalculation(): void {
    this.productId.valueChanges.subscribe((res) => {
      let productDetails: ProductViewModel = this.products.find(p => p.id == res)!;

      if(productDetails != undefined) {
        this.orderDetailsCreateForm.patchValue({
          productName: productDetails.name,
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
      let totalProductPrice: number = this.price.value * res;

      this.orderDetailsCreateForm.patchValue({
        totalOrderPrice: totalProductPrice
      });
    })
  }

  closeOrderDetails(): void {
    this.orderDetailsCreateForm.reset();
    this.orderDetailsCreateForm.patchValue({
      productId: ''
    })
  }

  updateOrderDetails(id: number): void {
    let orderDetailsInfo: OrderDetailsUpsertModel = this.createOrderModel.orderDetails.find(o => o.id == id)!;
    
    this.orderDetailsCreateForm.patchValue({
      id: orderDetailsInfo.id,
      productId: orderDetailsInfo.productId,
      productName: orderDetailsInfo.productName,
      price: orderDetailsInfo.price,
      quantity: orderDetailsInfo.quantity,
      totalOrderPrice: orderDetailsInfo.totalOrderPrice,
    })
  }

  deleteOrderDetails(id: number): void {
    let orderDetailsInfo: OrderDetailsUpsertModel = this.createOrderModel.orderDetails.find(o => o.id == id)!;
    let index: number = this.createOrderModel.orderDetails.indexOf(orderDetailsInfo);

    if (index !== -1) {
      this.createOrderModel.orderDetails.splice(index, 1);
    }   

    this.orderCreateForm.patchValue({
      totalPrice: this.calculateTotalPriceOfOrder()
    });
  }

  private increaseOrderDetailsId(): void {
    let orderDetailsId: number = this.createOrderModel.orderDetails.length;
    if(orderDetailsId == 0) {
      orderDetailsId = 1;
    }
    else {
      orderDetailsId += 1
    }

    this.orderDetailsCreateForm.patchValue({
      id: orderDetailsId
    });
  }

  private calculateTotalPriceOfOrder(): number {
    let totalPrice: number = 0;

    this.createOrderModel.orderDetails.forEach((item: any) => {
      totalPrice = item.totalOrderPrice + totalPrice;
    });

    return totalPrice;
  }

}
