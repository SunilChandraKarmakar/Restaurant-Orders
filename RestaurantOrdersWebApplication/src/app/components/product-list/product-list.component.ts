import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ProductViewModel } from 'src/app/models/product/ProductViewModel';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  products: ProductViewModel[] = [];
  constructor(private _productService: ProductService, private _toastr: ToastrService,  private _router: Router) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };

    this._productService.getProducts().subscribe((res) => {
      this.products = res;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy() {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  edit(id: number) {
    if(id == null || id == 0) {
      return this._toastr.warning('Product Can Not Find', 'Not Found');
    }
    else {
      return this._router.navigate([`product/edit/${id}`]);
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

        this._productService.delete(id).subscribe((res) => {
          this.ngOnInit();
        });
      }
    })
  }

}
