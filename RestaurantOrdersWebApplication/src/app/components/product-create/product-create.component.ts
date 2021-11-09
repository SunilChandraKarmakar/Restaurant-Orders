import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductUpsertModel } from 'src/app/models/product/ProductUpsertModel';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})

export class ProductCreateComponent implements OnInit {

  productCreateForm: FormGroup;
  isExistProductName: boolean = false;
  createProductModel: ProductUpsertModel = new ProductUpsertModel();

  constructor(private _productService: ProductService, private _formBuilder: FormBuilder, private _router: Router, private _toastr: ToastrService) { }

  ngOnInit() {
    this.productCreateForm = this._formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      price: new FormControl(null, [Validators.required])
    });

    this.checkExistProductName();
  }

  get name() {
    return this.productCreateForm.controls.name;
  }

  get price() {
    return this.productCreateForm.controls.price;
  }

  saveProduct(): void {
    this.createProductModel = this.productCreateForm.value;
    
    this._productService.post(this.createProductModel).subscribe((res) => {
      this._toastr.success('Product Created Successfull', 'Successfull');
      this.productCreateForm.reset();
      return this._router.navigate(['products']);
    })
  }

  checkExistProductName(): void {
    this.name.valueChanges.subscribe((res) => {      
      if(res == undefined || res == '') {
        return;
      }

      this._productService.existProductName(res).subscribe((res) => {
        this.isExistProductName = res;
      });
    });
  }

}
