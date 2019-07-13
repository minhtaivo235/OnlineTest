import { Injectable } from '@angular/core';
import { BaseapiService } from './baseapi.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExamTsResult {
  errorCode: Number;
  Message: string;
  data: [ExamT];
}
export interface ExamT {
  id: number;
  GRPT_ID: number;
  TAK_ID: number;
  EXADATE: Date;
  EXASTATUS :number;
  EXAIP :string;
  //user :User;
  //permiss :Permission
}
export interface AExamTResult{
  errorCode: Number;
  Message: string;
  data: ExamT;
}

@Injectable({
  providedIn: 'root'
})
export class ExamTService {
  // headers: HttpHeaders;
  constructor(private api: BaseapiService, private _http: HttpClient) {
    // const token: string = this.cookieservice.get('accessToken');
    // this.headers = new HttpHeaders({
    //   'Authorization': 'Bearer ' + token
    // });
  }
  getAll(): Observable<ExamTsResult> {
    return this._http.get<ExamTsResult>(this.api.url.examtalking);
  }
  // Delete(id: number): Observable<AExamTResult> {
  //   return this._http.delete<AExamTResult>(`${this.api.url.ExamT}/${id}`);
  // }
  add(ExamT: ExamT): Observable<AExamTResult>{
    return this._http.post<AExamTResult>(this.api.url.examtalking, ExamT);
  }
  // put(ExamT: ExamT): Observable<AExamTResult>{
  //   return this._http.put<AExamTResult>(`${this.api.url.ExamT}/${ExamT.id}`, ExamT);
  // }
  get(id):Observable<AExamTResult>{
    return this._http.get<AExamTResult>(`${this.api.url.examtalking}/${id}`);
  }
}
