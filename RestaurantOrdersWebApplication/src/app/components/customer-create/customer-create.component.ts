import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerUpsertModel } from 'src/app/models/customer/CustomerUpsertModel';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {

  customerCreateForm: FormGroup;
  isExistCustomerEmail: boolean = false;
  createCustomerModel: CustomerUpsertModel = new CustomerUpsertModel();

  constructor(private _customerService: CustomerService, private _formBuilder: FormBuilder, private _router: Router, private _toastr: ToastrService) { }

  ngOnInit() {
    this.customerCreateForm = this._formBuilder.group({
      id: new FormControl(),
      name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), Validators.email, Validators.minLength(11)]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('[- +()0-9]+')]),
      address: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)])
    });

    let email: string = '';

    this.customerCreateForm.get('email')?.valueChanges.subscribe((res) => {
      email = res;
    });

    this._customerService.existCustomerEmail(email).subscribe((res) => {
      this.isExistCustomerEmail = res;
      console.log('Recived value : ', this.isExistCustomerEmail);
    });
  }

  get name() {
    return this.customerCreateForm.controls.name;
  }

  get email() {
    return this.customerCreateForm.controls.email;
  }

  get phoneNumber() {
    return this.customerCreateForm.controls.phoneNumber;
  }

  get address() {
    return this.customerCreateForm.controls.address;
  }

  saveCustomer(): void {
    this.createCustomerModel = this.customerCreateForm.value;
    
    this._customerService.post(this.createCustomerModel).subscribe((res) => {
      this._toastr.success('Customer Created Successfull', 'Successfull');
      this.customerCreateForm.reset();
      return this._router.navigate(['customers']);
    })
  }

  // checkExistCustomerEmail(): void {
  //   let email: string = '';
   
  // }
}
