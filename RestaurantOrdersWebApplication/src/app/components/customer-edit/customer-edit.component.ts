import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  customerEditFormGroup: FormGroup;
  private _customerId: number;

  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this._customerId = params['id'];
    });

    this.customerEditFormGroup = new FormGroup({
      'id': new FormControl(),
      'name': new FormControl([Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      'email': new FormControl([Validators.required, Validators.email, Validators.minLength(11)]),
      'phoneNumber': new FormControl(Validators.required),
      'address': new FormControl([Validators.required, Validators.minLength(2), Validators.maxLength(50)])
    });
  }

}
