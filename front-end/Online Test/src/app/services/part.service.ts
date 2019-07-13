import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseapiService } from './baseapi.service';
import { Observable } from 'rxjs';

export interface PartsResult {
  errorCode: number;
  Message: string;
  data: [Part];
}
export interface Part {
  id: number;
  suB_ID: number;
  subname: string;
  parid: string;
  parname: string;
  pardirection: string;
  pardefaulT_SCORE: number;
  pardefaulT_COLUMN: number;
  pardefaulT_LEVEL: number;
  parnote: string;
}
export interface PartResult {
  errorCode: number;
  Message: string;
  data: Part;
}

@Injectable({
  providedIn: 'root'
})
export class PartService {

  constructor(private _http: HttpClient, private baseapi: BaseapiService) { }

  getAll(): Observable<PartsResult> {
    return this._http.get<PartsResult>(this.baseapi.url.part);
  }
  getAllForId(id): Observable<PartsResult>{
    return this._http.get<PartsResult>(`${this.baseapi.url.part}/PartInSub/${id}`);
  }
  get(id): Observable<PartResult> {
    return this._http.get<PartResult>(`${this.baseapi.url.part}/${id}`);
  }
  add(part: Part): Observable<PartResult>{
    return this._http.post<PartResult>(`${this.baseapi.url.part}`, part);
  }
  put(part: Part): Observable<PartResult>{
    return this._http.put<PartResult>(`${this.baseapi.url.part}/${part.id}`, part);
  }
  delete(id): Observable<PartResult>{
    return this._http.delete<PartResult>(`${this.baseapi.url.part}/${id}`);
  }
}
