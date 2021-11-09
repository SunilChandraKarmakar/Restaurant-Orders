import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductUpsertModel } from '../models/product/ProductUpsertModel';
import { ProductViewModel } from '../models/product/ProductViewModel';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private _baseUrl: string = 'https://localhost:44312/api';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private _httpClient: HttpClient) { }

  getProducts(): Observable<ProductViewModel[]> {
    const getProductsUrl: string = `${this._baseUrl}/product`;
    return this._httpClient.get<ProductViewModel[]>(getProductsUrl); 
  }

  getProduct(id: number): Observable<ProductViewModel> {
    const getProductUrl: string = `${this._baseUrl}/product/${id}`;
    return this._httpClient.get<ProductViewModel>(getProductUrl); 
  }

  post(productCreateModel: ProductUpsertModel): Observable<ProductViewModel> {  
    const createProductUrl: string = `${this._baseUrl}/product`;
    return this._httpClient.post<ProductViewModel>(createProductUrl, productCreateModel, this.httpOptions);
  }

  put(productEditModel: ProductUpsertModel): Observable<ProductViewModel> {
    const editProductUrl: string = `${this._baseUrl}/product/${productEditModel.id}`;
    return this._httpClient.put<ProductViewModel>(editProductUrl, productEditModel, this.httpOptions);
  }

  delete(id: number): Observable<ProductViewModel> {
    const deleteProductUrl: string = `${this._baseUrl}/product/${id}`;
    return this._httpClient.delete<ProductViewModel>(deleteProductUrl, this.httpOptions);
  }

  existProductName(name: string): Observable<boolean> {
    const checkExistProductNameUrl: string = `${this._baseUrl}/product/${name}`;
    return this._httpClient.get<boolean>(checkExistProductNameUrl, this.httpOptions);
  }

}
