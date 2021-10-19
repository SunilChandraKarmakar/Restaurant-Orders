import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerUpsertModel } from '../models/customer/CustomerUpsertModel';
import { CustomerViewModel } from '../models/customer/CustomerViewModel';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  private _baseUrl: string = 'https://localhost:7036/api/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private _httpClient: HttpClient) { }

  get(): Observable<CustomerViewModel[]> {
    let getCustomersUrl: string = this._baseUrl + 'customer';
    return this._httpClient.get<CustomerViewModel[]>(getCustomersUrl); 
  }

  post(customerCreateModel: CustomerUpsertModel): Observable<CustomerViewModel> {
    let createCustomerUrl: string = this._baseUrl + 'customer';
    return this._httpClient.post<CustomerViewModel>(createCustomerUrl, customerCreateModel, this.httpOptions);
  }

}
