import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiUrl = 'http://localhost:8080/budget';

  constructor(private http: HttpClient) { }

  getBudgets(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createBudget(budget: any): Observable<any> {
    return this.http.post(this.apiUrl, budget);
  }

  // updateBudget(id: number, budget: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/${id}`, budget);
  // }

  deleteBudget(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}