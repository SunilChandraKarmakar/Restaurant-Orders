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
import { OrderdetailsService } from 'src/app/services/orderdetails.service';
import { PaymentgetwayService } from 'src/app/services/paymentgetway.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

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

  constructor(private _orderService: OrderService, private _orderDetailsService: OrderdetailsService, private _orderFormBuilder: FormBuilder, private _paymentGetwayService: PaymentgetwayService, private _orderDetailsFormBuilder: FormBuilder, private _customerService: CustomerService, private _productService: ProductService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this._orderId = params['id'];
    });

    this.getPaymentGetways();
    this.getCustomers();
    this.getProducts();

    this.orderEditForm = this._orderFormBuilder.group({
      id: new FormControl(),
      orderNumber: new FormControl([Validators.required, Validators.minLength(7), Validators.maxLength(7)]),
      customerId: new FormControl('', Validators.required),
      paymentGetwayId: new FormControl('', Validators.required),
      totalPrice: new FormControl('', Validators.required)
    });

    this.orderDetailsEditForm = this._orderDetailsFormBuilder.group({
      id: new FormControl(),
      orderId: new FormControl(),
      productId: new FormControl('', Validators.required),
      productName: new FormControl(),
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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6 ',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );

        this._orderDetailsService.delete(id).subscribe((res) => {
          this.ngOnInit();
        });
      }
    })
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

  updateOrderDetails(id: number): void {
    let selectedOrderDetails: OrderDetailsViewModel = this.orderEditModel.orderDetails.find(od => od.id == id)!;

    this.orderDetailsEditForm.patchValue({
      id: selectedOrderDetails.id,
      orderId: selectedOrderDetails.orderId,
      productId: selectedOrderDetails.productId,
      productName: selectedOrderDetails.product.name,
      price: selectedOrderDetails.product.price,
      quantity: selectedOrderDetails.quantity,
      totalOrderPrice:  selectedOrderDetails.product.price * selectedOrderDetails.quantity
    });
  }
  
  saveOrderDetails(): void {
    let orderDetailsId: number = this.orderDetailsEditForm.controls.id.value;
    let index: number = this.orderEditModel.orderDetails.findIndex(x => x.id == orderDetailsId);

    this.orderEditModel.orderDetails[index].orderId = this.orderDetailsEditForm.controls.orderId.value;
    this.orderEditModel.orderDetails[index].product.id = this.orderDetailsEditForm.controls.productId.value;
    this.orderEditModel.orderDetails[index].product.price = this.orderDetailsEditForm.controls.price.value;
    this.orderEditModel.orderDetails[index].product.name = this.orderDetailsEditForm.controls.productName.value;
    this.orderEditModel.orderDetails[index].quantity = this.orderDetailsEditForm.controls.quantity.value;

    this.orderEditForm.patchValue({
      totalPrice: this.calculateTotalPriceOfOrder()
    });

    this.closeOrderDetails();
  }

  closeOrderDetails(): void {
    this.orderDetailsEditForm.reset();
    this.orderDetailsEditForm.patchValue({
      productId: ''
    })
  }

}
