import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerUpsertModel } from '../models/customer/CustomerUpsertModel';
import { CustomerViewModel } from '../models/customer/CustomerViewModel';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  private _baseUrl: string = 'https://localhost:44312/api';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private _httpClient: HttpClient) { }

  getCustomers(): Observable<CustomerViewModel[]> {
    const getCustomersUrl: string = `${this._baseUrl}/customer`;
    return this._httpClient.get<CustomerViewModel[]>(getCustomersUrl); 
  }

  getCustomer(id: number): Observable<CustomerViewModel> {
    const getCustomerUrl: string = `${this._baseUrl}/customer/${id}`;
    return this._httpClient.get<CustomerViewModel>(getCustomerUrl); 
  }

  post(customerCreateModel: CustomerUpsertModel): Observable<CustomerViewModel> {  
    const createCustomerUrl: string = `${this._baseUrl}/customer`;
    return this._httpClient.post<CustomerViewModel>(createCustomerUrl, customerCreateModel, this.httpOptions);
  }

  put(customerEditModel: CustomerUpsertModel): Observable<CustomerViewModel> {
    const editCustomerUrl: string = `${this._baseUrl}/customer/${customerEditModel.id}`;
    return this._httpClient.put<CustomerViewModel>(editCustomerUrl, customerEditModel, this.httpOptions);
  }

  delete(id: number): Observable<CustomerViewModel> {
    const deleteCustomerUrl: string = `${this._baseUrl}/customer/${id}`;
    return this._httpClient.delete<CustomerViewModel>(deleteCustomerUrl, this.httpOptions);
  }

  existCustomerEmail(email: string): Observable<boolean> {
    const checkExistCustomerEmailUrl: string = `${this._baseUrl}/customer/${email}`;
    return this._httpClient.get<boolean>(checkExistCustomerEmailUrl, this.httpOptions);
  }
}
