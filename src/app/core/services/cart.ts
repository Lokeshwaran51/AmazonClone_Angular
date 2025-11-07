import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Cart {
  private readonly base = 'https://localhost:7055/api/Cart';
  constructor(private http:HttpClient){}
  GetCartItemCount(email:string):Observable<number>{
    return this.http.get<number>(`${this.base}/CartItemByCount?Email=${email}`);
  }
}
