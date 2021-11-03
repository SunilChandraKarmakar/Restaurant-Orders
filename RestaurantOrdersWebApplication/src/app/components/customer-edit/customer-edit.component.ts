import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerUpsertModel } from 'src/app/models/customer/CustomerUpsertModel';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss'],
})

export class CustomerEditComponent implements OnInit {

  customerEditFormGroup: FormGroup;
  customerEditModel: CustomerUpsertModel = new CustomerUpsertModel();
  private _customerId: number;

  constructor(private _cistomerService: CustomerService, private _activatedRoute: ActivatedRoute, private _toastr: ToastrService, private _router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this._customerId = params['id'];
    });

    this.customerEditFormGroup = this._formBuilder.group({
      id: new FormControl(),
      name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), Validators.email, Validators.minLength(11)]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('[- +()0-9]+')]),
      address: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)])
    });

    this._cistomerService.getCustomer(this._customerId).subscribe((res) => {
      this.customerEditFormGroup.patchValue(res);
    });
  }

  edit(): void {
    this.customerEditModel = this.customerEditFormGroup.value;
    this._cistomerService.put(this.customerEditModel).subscribe((res) => {
      this._toastr.success('Customer Update Successfull', 'Successfull');
      this.customerEditFormGroup.reset();
      return this._router.navigate(['customers']);
    });
  }

  get name() {
    return this.customerEditFormGroup.controls.name;
  }

  get email() {
    return this.customerEditFormGroup.controls.email;
  }

  get phoneNumber() {
    return this.customerEditFormGroup.controls.phoneNumber;
  }

  get address() {
    return this.customerEditFormGroup.controls.address;
  }

}
