import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:8080/transaction';


  constructor(private http: HttpClient) { }

  createTransaction(transactionData: any) {
    return this.http.post(this.apiUrl, transactionData);
  }

  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTransaction(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateTransaction(id: number, transactionData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, transactionData);
  }

  deleteTransaction(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
