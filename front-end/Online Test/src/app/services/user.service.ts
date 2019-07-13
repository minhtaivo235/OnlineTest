import { Injectable } from '@angular/core';
import { BaseapiService } from './baseapi.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usertype } from './usertype.service';

export interface UserResult {
  errorCode : number ;
  Message :string;
  data: [User];
}

export interface User  {
  id: number ;
  useT_ID: number ;
  useaccount: string ;
  useenC_PASSWORD: string ;
  

  usefirstname: string ;
  uselastname: string ;
  usedob: Date;
  usegender: boolean;
  useemail: string ;
  usephone: string ;
  useisactive: boolean;
  usedate: Date;
  user_Types: Usertype;
}

export interface AUserResult {
  errorCode : number ;
  Message :string;
  data: User;
}
@Injectable({
  providedIn: 'root'
})


export class UserService {

  constructor( private api: BaseapiService , private _http: HttpClient) { }

  getAll(): Observable<UserResult> {
    return this._http.get<UserResult>(this.api.url.user);
  }
  Delete(id: number): Observable<AUserResult> {
    return this._http.delete<AUserResult>(`${this.api.url.user}/${id}`);
  }
  add(User: User): Observable<AUserResult>{
    return this._http.post<AUserResult>(this.api.url.user, User);
  }
  put(User: User): Observable<AUserResult>{
    return this._http.put<AUserResult>(`${this.api.url.user}/${User.id}`, User);
  }
  get(id):Observable<AUserResult>{
    return this._http.get<AUserResult>(`${this.api.url.user}/${id}`);
  }
}
