import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this._httpClient.get<OrderViewModel[]>(getOrdersUrl); 
  }

}
