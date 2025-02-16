import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root' // Disponível globalmente
})
export class HttpClientService {
  private apiUrl = 'https://suaapi.com/api/'; 
  private apiKey = 'YOUR_X_API_KEY'; 

  constructor(private http: HttpClient) {}

  private getHeaders(customHeaders?: { [key: string]: string }): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-KEY': this.apiKey, 
      ...customHeaders 
    });
    return headers;
  }

  get<T>(endpoint: string, params?: HttpParams | { [param: string]: string | string[] }, customHeaders?: { [key: string]: string }): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${endpoint}`, {
      headers: this.getHeaders(customHeaders),
      params
    }).pipe(
      catchError(this.handleError)
    );
  }

  post<T>(endpoint: string, body: any, customHeaders?: { [key: string]: string }): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, body, {
      headers: this.getHeaders(customHeaders)
    }).pipe(
      catchError(this.handleError)
    );
  }

  put<T>(endpoint: string, body: any, customHeaders?: { [key: string]: string }): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${endpoint}`, body, {
      headers: this.getHeaders(customHeaders)
    }).pipe(
      catchError(this.handleError)
    );
  }

  delete<T>(endpoint: string, customHeaders?: { [key: string]: string }): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${endpoint}`, {
      headers: this.getHeaders(customHeaders)
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Erro na requisição:', error);
    return throwError(() => new Error(error.message || 'Erro desconhecido'));
  }
}
