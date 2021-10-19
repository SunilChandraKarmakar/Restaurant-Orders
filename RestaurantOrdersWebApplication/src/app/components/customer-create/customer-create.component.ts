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

  constructor(private customerService: CustomerService, private _router: Router, private _toastr: ToastrService) { }

  ngOnInit() {
    this.customerFormGroup = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.minLength(11)]),
      'phoneNumber': new FormControl(null, Validators.required),
      'address': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)])
    });
  }

  saveCustomer(): void {
    this.createCustomerModel = this.customerFormGroup.value;
    
    this.customerService.post(this.createCustomerModel).subscribe((res) => {
      this._toastr.success('Customer Created Successfull', 'Successfull');
      // this.customerFormGroup.reset();
      // return this._router.navigate(['customers']);
    })
  }
}
