import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseapiService } from './baseapi.service';
import { Observable } from 'rxjs';

export interface LoginResult {
  errorCode: Number;
  errorMessage: string;
  data: {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    token: string;
  };
}
export interface LoginRequest{
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: BaseapiService, private _http: HttpClient) { }
  login(login: LoginRequest): Observable<LoginResult> {
    return this._http.post<LoginResult>(this.api.url.login, login);
  }
}
