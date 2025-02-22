import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environments';
import { IHttpClient } from '../../interfaces/http-client.interface';

@Injectable({
  providedIn: 'root' // Define como singleton
})
export class HttpClientService implements IHttpClient {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  private getHeaders(customHeaders?: { [key: string]: string }, requireApiKey: boolean = true): HttpHeaders {
    let headersConfig: { [key: string]: string } = {
      'Content-Type': 'application/json',
      ...customHeaders
    };

    if (requireApiKey) {
      headersConfig['X-API-KEY'] = this.apiKey;
    }

    return new HttpHeaders(headersConfig);
  }

  get<T>(endpoint: string, params?: HttpParams | { [param: string]: string | string[] }, customHeaders?: { [key: string]: string }, requireApiKey: boolean = true): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${endpoint}`, {
      headers: this.getHeaders(customHeaders, requireApiKey),
      params
    }).pipe(catchError(this.handleError));
  }

  post<T>(endpoint: string, body: any, customHeaders?: { [key: string]: string }, requireApiKey: boolean = true): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, body, {
      headers: this.getHeaders(customHeaders, requireApiKey)
    }).pipe(catchError(this.handleError));
  }

  put<T>(endpoint: string, body: any, customHeaders?: { [key: string]: string }, requireApiKey: boolean = true): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${endpoint}`, body, {
      headers: this.getHeaders(customHeaders, requireApiKey)
    }).pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string, customHeaders?: { [key: string]: string }, requireApiKey: boolean = true): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${endpoint}`, {
      headers: this.getHeaders(customHeaders, requireApiKey)
    }).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Erro na requisição:', error);
    return throwError(() => new Error(error.message || 'Erro desconhecido'));
  }
}
