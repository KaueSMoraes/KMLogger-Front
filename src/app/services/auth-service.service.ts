import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHttpClient } from '../../interfaces/http-client.interface';
import { HTTP_CLIENT_SERVICE } from './dependecy-injection-factory';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private endpoint = 'auth/login'; 

  constructor(@Inject(HTTP_CLIENT_SERVICE) private httpService: IHttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.httpService.post(this.endpoint, credentials, {}, true);
  }

  register(credentials: {email:string, firstName: string, lastName: string, 
    password: string, phoneNumber: string }): Observable<any> {
    return this.httpService.post(this.endpoint, credentials, {}, true);
  }
}