import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentGetwayUpsertModel } from 'src/app/models/paymentgetway/PaymentGetwayUpsertModel';
import { PaymentgetwayService } from 'src/app/services/paymentgetway.service';

@Component({
  selector: 'app-paymentgetway-create',
  templateUrl: './paymentgetway-create.component.html',
  styleUrls: ['./paymentgetway-create.component.scss']
})
export class PaymentgetwayCreateComponent implements OnInit {

  paymentGetwayCreateForm: FormGroup;
  isExistName: boolean = false;
  createPaymentGetwayModel: PaymentGetwayUpsertModel = new PaymentGetwayUpsertModel();

  constructor(private _pymentGetwayService: PaymentgetwayService, private _formBuilder: FormBuilder, private _router: Router, private _toastr: ToastrService) { }

  ngOnInit() {
    this.paymentGetwayCreateForm = this._formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)])
    });
  }

  get name() {
    return this.paymentGetwayCreateForm.controls.name;
  }

  savePaymentGetway(): void {
    this.createPaymentGetwayModel = this.paymentGetwayCreateForm.value;
    
    this._pymentGetwayService.post(this.createPaymentGetwayModel).subscribe((res) => {
      this._toastr.success('Payment Getway Created Successfull', 'Successfull');
      this.paymentGetwayCreateForm.reset();
      return this._router.navigate(['paymentgetways']);
    })
  }

  checkExistName(): void {
    this.name.valueChanges.subscribe((res) => {      
      if(res == undefined || res == '') {
        return;
      }

      this._pymentGetwayService.existName(res).subscribe((res) => {
        this.isExistName = res;
      });
    });
  }
}
