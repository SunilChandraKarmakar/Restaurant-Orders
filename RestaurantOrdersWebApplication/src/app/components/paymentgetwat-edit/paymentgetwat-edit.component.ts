import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentGetwayUpsertModel } from 'src/app/models/paymentgetway/PaymentGetwayUpsertModel';
import { PaymentgetwayService } from 'src/app/services/paymentgetway.service';

@Component({
  selector: 'app-paymentgetwat-edit',
  templateUrl: './paymentgetwat-edit.component.html',
  styleUrls: ['./paymentgetwat-edit.component.scss']
})
export class PaymentgetwatEditComponent implements OnInit {

  paymentGetwayEditFormGroup: FormGroup;
  paymentGetwayEditModel: PaymentGetwayUpsertModel = new PaymentGetwayUpsertModel();
  private _paymentGetwayId: number;

  constructor(private _paymentGetwayService: PaymentgetwayService, private _activatedRoute: ActivatedRoute, private _toastr: ToastrService, private _router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this._paymentGetwayId = params['id'];
    });

    this.paymentGetwayEditFormGroup = this._formBuilder.group({
      id: new FormControl(),
      name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)])
    });

    this._paymentGetwayService.getPaymentGetway(this._paymentGetwayId).subscribe((res) => {
      this.paymentGetwayEditFormGroup.patchValue(res);
    });
  }

  edit(): void {
    this.paymentGetwayEditModel = this.paymentGetwayEditFormGroup.value;
    this._paymentGetwayService.put(this.paymentGetwayEditModel).subscribe((res) => {
      this._toastr.success('Payment Getway Update Successfull', 'Successfull');
      this.paymentGetwayEditFormGroup.reset();
      return this._router.navigate(['paymentgetways']);
    });
  }

  get name() {
    return this.paymentGetwayEditFormGroup.controls.name;
  }

}
