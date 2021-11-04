import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentGetwayUpsertModel } from '../models/paymentgetway/PaymentGetwayUpsertModel';
import { PaymentGetwayViewModel } from '../models/paymentgetway/PaymentGetwayViewModel';

@Injectable({
  providedIn: 'root'
})

export class PaymentgetwayService {
  private _baseUrl: string = 'https://localhost:44312/api';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private _httpClient: HttpClient) { }

  getPaymentGetways(): Observable<PaymentGetwayViewModel[]> {
    const getPaymentGetwaysUrl: string = `${this._baseUrl}/paymentgetway`;
    return this._httpClient.get<PaymentGetwayViewModel[]>(getPaymentGetwaysUrl); 
  }

  getPaymentGetway(id: number): Observable<PaymentGetwayViewModel> {
    const getPaymentGetwayUrl: string = `${this._baseUrl}/paymentgetway/${id}`;
    return this._httpClient.get<PaymentGetwayViewModel>(getPaymentGetwayUrl); 
  }

  post(paymentGetwayCreateModel: PaymentGetwayUpsertModel): Observable<PaymentGetwayViewModel> {  
    const createPaymentGetwayUrl: string = `${this._baseUrl}/paymentgetway`;
    return this._httpClient.post<PaymentGetwayViewModel>(createPaymentGetwayUrl, paymentGetwayCreateModel, this.httpOptions);
  }

  put(paymentGetwayEditModel: PaymentGetwayUpsertModel): Observable<PaymentGetwayViewModel> {
    const editPaymentGetwayUrl: string = `${this._baseUrl}/paymentgetway/${paymentGetwayEditModel.id}`;
    return this._httpClient.put<PaymentGetwayViewModel>(editPaymentGetwayUrl, paymentGetwayEditModel, this.httpOptions);
  }

  delete(id: number): Observable<PaymentGetwayViewModel> {
    const deletePaymentGetwayUrl: string = `${this._baseUrl}/paymentgetway/${id}`;
    return this._httpClient.delete<PaymentGetwayViewModel>(deletePaymentGetwayUrl, this.httpOptions);
  }

  existName(name: string): Observable<boolean> {
    const checkExistNameUrl: string = `${this._baseUrl}/paymentgetway/${name}`;
    return this._httpClient.get<boolean>(checkExistNameUrl, this.httpOptions);
  }
}
