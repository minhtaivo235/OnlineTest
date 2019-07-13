import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseapiService } from './baseapi.service';
import { Observable } from 'rxjs';


export interface PrivilegesResult {
  errorCode: number;
  Message: string;
  data: [Privilege];
}
export interface Privilege {
  id: number;
  PriName: string;
  PriUrl: string;
  PriParent: Int16Array;
  PriOder:Int16Array;
  PriNote: string;


}
export interface PrivilegeResult {
  errorCode: number;
  Message: string;
  data: Privilege;
}

@Injectable({
  providedIn: 'root'
})

export class PrivilegeService {
    
  constructor(private _http: HttpClient, private baseapi: BaseapiService) { }

  getAll(): Observable<PrivilegesResult> {
    return this._http.get<PrivilegesResult>(this.baseapi.url.privilege);
  }
  get(id): Observable<PrivilegeResult> {
    return this._http.get<PrivilegeResult>(`${this.baseapi.url.privilege}/${id}`);
  }
  add(privilege: Privilege): Observable<PrivilegeResult>{
    return this._http.post<PrivilegeResult>(`${this.baseapi.url.privilege}`, privilege);
  }
  put(privilege: Privilege): Observable<PrivilegeResult>{
    return this._http.put<PrivilegeResult>(`${this.baseapi.url.privilege}/${privilege.id}`, privilege);
  }
  delete(id): Observable<PrivilegeResult>{
    return this._http.delete<PrivilegeResult>(`${this.baseapi.url.privilege}/${id}`);
  }

 }

  

