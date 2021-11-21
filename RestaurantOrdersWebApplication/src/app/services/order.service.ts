import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderUpsertModel } from '../models/order/OrderUpsertModel';
import { OrderViewModel } from '../models/order/OrderViewModel';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  private _baseUrl: string = 'https://localhost:44312/api';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private _httpClient: HttpClient) { }

  getOrders(): Observable<OrderViewModel[]> {
    const getOrdersUrl: string = `${this._baseUrl}/order`;
    let orders: Observable< OrderViewModel[]> = this._httpClient.get<OrderViewModel[]>(getOrdersUrl); 
    return orders;
  }

  getOrder(id: number): Observable<OrderViewModel> {
    const getOrderUrl: string = `${this._baseUrl}/order/${id}`;
    return this._httpClient.get<OrderViewModel>(getOrderUrl); 
  }

  post(orderCreateModel: OrderUpsertModel): Observable<OrderViewModel> {  
    const createOrderUrl: string = `${this._baseUrl}/order`;
    return this._httpClient.post<OrderViewModel>(createOrderUrl,orderCreateModel, this.httpOptions);
  }

  delete(id: number): Observable<OrderViewModel> {
    const deleteOrderUrl: string = `${this._baseUrl}/order/${id}`;
    return this._httpClient.delete<OrderViewModel>(deleteOrderUrl, this.httpOptions);
  }

}
