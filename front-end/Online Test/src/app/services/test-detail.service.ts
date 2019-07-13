import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseapiService } from './baseapi.service';

export interface Test_Detail {
  id: number;
  teS_ID: number;
  tesdid: number;
  tesdtable: number;
  tesdnO_QUESTION: number;
}
export interface Test_DetailRequest{
  tes_id: number;
  list_test_detail: Test_Detail[];
}
export interface Test_DetailResult{
  errorCode: Number;
  Message: string;
  data: [Test_Detail];
}

@Injectable({
  providedIn: 'root'
})
export class TestDetailService {

  constructor(private _http: HttpClient, private api: BaseapiService) { }

  add(testDetail: Test_DetailRequest): Observable<Test_DetailResult>{
    return this._http.post<Test_DetailResult>(this.api.url.test_detail, testDetail);
  }
  put(testDetail: Test_DetailRequest): Observable<Test_DetailResult>{
    return this._http.put<Test_DetailResult>(`${this.api.url.test_detail}/${testDetail.tes_id}`, testDetail);
  }
  get(id):Observable<Test_DetailResult>{
    return this._http.get<Test_DetailResult>(`${this.api.url.test_detail}/${id}`);
  }
}
