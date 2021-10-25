import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  customerFormGroup: FormGroup;
  createCustomerModel: CustomerUpsertModel = new CustomerUpsertModel();
  email: string;

  constructor(private customerService: CustomerService, private _router: Router, private _toastr: ToastrService) { }

  ngOnInit() {
    this.customerFormGroup = new FormGroup({
      'id': new FormControl(0),
      'name': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.minLength(11)]),
      'phoneNumber': new FormControl(null, Validators.required),
      'address': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)])
    });

    this.customerFormGroup.get('email')?.valueChanges.subscribe((res) => {
      this.email = res;
    });
  }

  saveCustomer(): void {
    this.createCustomerModel = this.customerFormGroup.value;
    
    this.customerService.post(this.createCustomerModel).subscribe((res) => {
      console.log('Call post method in customer create component.');
      this._toastr.success('Customer Created Successfull', 'Successfull');
      this.customerFormGroup.reset();
      return this._router.navigate(['customers']);
    })
  }

  checkEmail(): void {
    console.log(this.email);
  }
}
