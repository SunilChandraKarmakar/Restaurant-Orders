import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerViewModel } from 'src/app/models/customer/CustomerViewModel';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})

export class CustomerListComponent implements OnInit {

  customers: CustomerViewModel[] = [];
  constructor(private _customerService: CustomerService, private _toastr: ToastrService,  private _router: Router) { }

  ngOnInit() {
    this._customerService.getCustomers().subscribe((res) => {
      this.customers = res;
    });
  }

  edit(id: number) {
    if(id == null || id == 0) {
      return this._toastr.warning('Customer Can Not Find', 'Not Found');
    }
    else {
      return this._router.navigate([`customer/edit/${id}`]);
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

        this._customerService.delete(id).subscribe((res) => {
          this.ngOnInit();
        });
      }
    })
  }

}
