import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { PaymentGetwayViewModel } from 'src/app/models/paymentgetway/PaymentGetwayViewModel';
import { PaymentgetwayService } from 'src/app/services/paymentgetway.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paymentgetway-list',
  templateUrl: './paymentgetway-list.component.html',
  styleUrls: ['./paymentgetway-list.component.scss']
})
export class PaymentgetwayListComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  paymentGetways: PaymentGetwayViewModel[] = [];
  constructor(private _paymentGetwayService: PaymentgetwayService, private _toastr: ToastrService,  private _router: Router) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };

    this._paymentGetwayService.getPaymentGetways().subscribe((res) => {
      this.paymentGetways = res;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy() {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  edit(id: number) {
    if(id == null || id == 0) {
      return this._toastr.warning('Payment Getway Can Not Find', 'Not Found');
    }
    else {
      return this._router.navigate([`paymentgetway/edit/${id}`]);
    }
  }

  delete(id: number): void {
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

        this._paymentGetwayService.delete(id).subscribe((res) => {
          this.ngOnInit();
        });
      }
    })
  }

}
