import { Injectable } from '@angular/core';
import { BaseapiService } from './baseapi.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TakersResult {
  errorCode: Number;
  Message: string;
  data: [Taker];
}
export interface Taker {
  id: number;
  takid: string;
  TAKFIRSTNAME: string;
  TAKLASTNAME: string;
  TAKGENDER :boolean;
  TAKDOB :Date;
  TAKADDRESS :string;
  TAKEMAIL :string ;
  TAKPHONE :string ;
}
export interface TakerRequest{
  grpt_id: number;
  tak: Taker;
}
export interface ATakerResult{
  errorCode: Number;
  Message: string;
  data: Taker;
}

@Injectable({
  providedIn: 'root'
})
export class TakerService {
  // headers: HttpHeaders;
  constructor(private api: BaseapiService, private _http: HttpClient) {
    // const token: string = this.cookieservice.get('accessToken');
    // this.headers = new HttpHeaders({
    //   'Authorization': 'Bearer ' + token
    // });
  }
  // getAll(): Observable<TakersResult> {
  //   return this._http.get<TakersResult>(this.api.url.taker);
  // }
  // Delete(id: number): Observable<ATakerResult> {
  //   return this._http.delete<ATakerResult>(`${this.api.url.taker}/${id}`);
  // }
  add(takerreq: TakerRequest): Observable<ATakerResult>{
    return this._http.post<ATakerResult>(this.api.url.taker, takerreq);
  }
  // put(Taker: Taker): Observable<ATakerResult>{
  //   return this._http.put<ATakerResult>(`${this.api.url.taker}/${Taker.id}`, Taker);
  // }
  get(id):Observable<ATakerResult>{
    return this._http.get<ATakerResult>(`${this.api.url.taker}/${id}`);
  }
}
