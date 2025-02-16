import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './http-client.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endpoint = 'auth/login'; 

  constructor(private httpService: HttpClientService) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.httpService.post(this.endpoint, credentials);
  }
}