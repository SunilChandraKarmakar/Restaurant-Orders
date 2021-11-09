import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductUpsertModel } from 'src/app/models/product/ProductUpsertModel';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  productEditFormGroup: FormGroup;
  productEditModel: ProductUpsertModel = new ProductUpsertModel();
  private _productId: number;

  constructor(private _productService: ProductService, private _activatedRoute: ActivatedRoute, private _toastr: ToastrService, private _router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this._productId = params['id'];
    });

    this.productEditFormGroup = this._formBuilder.group({
      id: new FormControl(),
      name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      price: new FormControl(null, [Validators.required])
    });

    this._productService.getProduct(this._productId).subscribe((res) => {
      this.productEditFormGroup.patchValue(res);
    });
  }

  edit(): void {
    this.productEditModel = this.productEditFormGroup.value;
    this._productService.put(this.productEditModel).subscribe((res) => {
      this._toastr.success('Product Update Successfull', 'Successfull');
      this.productEditFormGroup.reset();
      return this._router.navigate(['products']);
    });
  }

  get name() {
    return this.productEditFormGroup.controls.name;
  }

  get price() {
    return this.productEditFormGroup.controls.price;
  }

}
