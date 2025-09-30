import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SubCategory {
  subCategoryId: number;
  name: string;
  categoryId?: number;
}

@Injectable({
  providedIn: 'root'
})

export class SubCategories {
  private readonly base = 'https://localhost:7243/api/Category';

  constructor(private http: HttpClient) {}
  getSubCategories(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/GetSubCategoryByCategoryId/${categoryId}`);
  }
}
