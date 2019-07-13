import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseapiService } from './baseapi.service';
import { Observable } from 'rxjs';

export interface SubjectsResult{
  errorCode: Number;
  Message: string;
  data: [Subject];
}
export interface Subject{
  id: number;
  parenT_ID: number;
  subid: string;
  subname: string;
  subjectChild: Subject;
}
export interface SubjectResult{
  errorCode: Number;
  errorMessage: string;
  data: Subject;
}

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private _http: HttpClient, private api: BaseapiService) { }

  getAll(): Observable<SubjectsResult>{
    return this._http.get<SubjectsResult>(this.api.url.subject);
  }
  get(id):Observable<SubjectResult>{
    return this._http.get<SubjectResult>(`${this.api.url.subject}/${id}`);
  }
  add(sub: Subject): Observable<SubjectResult>{
    return this._http.post<SubjectResult>(this.api.url.subject, sub);
  }
  put(sub: Subject): Observable<SubjectResult>{
    return this._http.put<SubjectResult>(`${this.api.url.subject}/${sub.id}`, sub);
  }
  delete(id): Observable<SubjectResult>{
    return this._http.delete<SubjectResult>(`${this.api.url.subject}/${id}`);
  }
}

