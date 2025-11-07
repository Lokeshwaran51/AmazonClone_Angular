import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Category {
  private readonly base = 'https://localhost:7243/api/Category';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/GetAllCategories`);
  }

  getSubCategoriesById(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/GetSubCategoriesById/${categoryId}`);
  }
}