import { Injectable } from '@angular/core';
import { BaseapiService } from './baseapi.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UsertypesResult {
  errorCode: Number;
  Message: string;
  data: [Usertype];
}
export interface Usertype {
  id: number;
  usetname: string;
  usetisadmin: boolean;
  usetnote: string;
  //user :User;
  //permiss :Permission
}
export interface AUsertypeResult{
  errorCode: Number;
  Message: string;
  data: Usertype;
}

@Injectable({
  providedIn: 'root'
})
export class UsertypeService {
  // headers: HttpHeaders;
  constructor(private api: BaseapiService, private _http: HttpClient) {
    // const token: string = this.cookieservice.get('accessToken');
    // this.headers = new HttpHeaders({
    //   'Authorization': 'Bearer ' + token
    // });
  }
  getAll(): Observable<UsertypesResult> {
    return this._http.get<UsertypesResult>(this.api.url.usertype);
  }
  Delete(id: number): Observable<AUsertypeResult> {
    return this._http.delete<AUsertypeResult>(`${this.api.url.usertype}/${id}`);
  }
  add(Usertype: Usertype): Observable<AUsertypeResult>{
    return this._http.post<AUsertypeResult>(this.api.url.usertype, Usertype);
  }
  put(Usertype: Usertype): Observable<AUsertypeResult>{
    return this._http.put<AUsertypeResult>(`${this.api.url.usertype}/${Usertype.id}`, Usertype);
  }
  get(id):Observable<AUsertypeResult>{
    return this._http.get<AUsertypeResult>(`${this.api.url.usertype}/${id}`);
  }
}
