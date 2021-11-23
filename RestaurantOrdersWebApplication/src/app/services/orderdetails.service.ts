import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { OrderDetailsViewModel } from '../models/orderdetails/OrderDetailsViewModel';

@Injectable({
  providedIn: 'root'
})

export class OrderdetailsService {
  private _baseUrl: string = 'https://localhost:44312/api';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private _httpClient: HttpClient) { }

  delete(id: number): Observable<OrderDetailsViewModel> {
    const deleteOrderDetailsUrl: string = `${this._baseUrl}/orderdetails/${id}`;
    return this._httpClient.delete<OrderDetailsViewModel>(deleteOrderDetailsUrl, this.httpOptions);
  }

}
