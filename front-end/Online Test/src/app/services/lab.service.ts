import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseapiService } from './baseapi.service';
import { Observable } from 'rxjs';


export interface LabsResult {
  errorCode: Number;
  errorMessage: string;
  data: [Lab];
}

export interface Lab {
  id: number;
  labname: string;
  labaddress: string;
}

export interface LabResult{
  errorCode: Number;
  errorMessage: string;
  data: Lab;
}


@Injectable({
  providedIn: 'root'
})
export class LabService {

  constructor(private http: HttpClient, private api: BaseapiService) { }

  getAll(): Observable<LabsResult> {
    return this.http.get<LabsResult>(this.api.url.lab);
  }
  get(id): Observable<LabResult> {
    return this.http.get<LabResult>(`${this.api.url.lab}/${id}`);
  }
  add(lab: Lab): Observable<LabResult> {
    return this.http.post<LabResult>(this.api.url.lab, lab);
  }
  put(lab: Lab): Observable<LabResult> {
    return this.http.put<LabResult>(`${this.api.url.lab}/${lab.id}`, lab);
  }
  delete(id): Observable<LabResult> {
    return this.http.delete<LabResult>(`${this.api.url.lab}/${id}`);
  }
}
