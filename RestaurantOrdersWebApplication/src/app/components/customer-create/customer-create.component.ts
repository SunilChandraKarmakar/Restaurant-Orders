import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {

  customerFormGroup: FormGroup;

  constructor() { }

  ngOnInit() {
    this.customerFormGroup = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.minLength(11)]),
      'phoneNumber': new FormControl(null, Validators.required),
      'address': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)])
    });
  }

}
