import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseapiService } from './baseapi.service';
import { Observable } from 'rxjs';

export interface SemestersResult {
  errorCode: Number;
  Message: string;
  data: [Semester];
}
export interface Semester {
  id: number;
  semsemester: number;
  semyear: number;
  // semiscurrent: number;
}
export interface SemesterResult {
  errorCode: Number;
  Message: string;
  data: Semester;
}

@Injectable({
  providedIn: 'root'
})
export class SemesterService {

  constructor(private _http: HttpClient, private api: BaseapiService) { }
  getAll(): Observable<SemestersResult> {
    return this._http.get<SemestersResult>(this.api.url.semester);
  }
  get(id): Observable<SemesterResult> {
    return this._http.get<SemesterResult>(`${this.api.url.semester}/${id}`);
  }
  add(sem: Semester): Observable<SemesterResult> {
    return this._http.post<SemesterResult>(this.api.url.semester, sem);
  }
  put(sem: Semester): Observable<SemesterResult> {
    return this._http.put<SemesterResult>(`${this.api.url.semester}/${sem.id}`, sem);
  }
  delete(id): Observable<SemesterResult> {
    return this._http.delete<SemesterResult>(`${this.api.url.semester}/${id}`);
  }
}
