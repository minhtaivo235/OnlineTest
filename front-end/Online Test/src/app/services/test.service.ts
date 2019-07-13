import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseapiService } from './baseapi.service';
import { Observable } from 'rxjs';
import { Test_Detail } from './test-detail.service';

export interface TestsResult {
  errorCode: number;
  errorMessage: string;
  data: [Test];
}

export interface Test {
  id: number;
  suB_ID: number;
  usE_ID: number;
  seM_ID: number;
  tesT_ID: number;
  testitle: string;
  tesdate: Date;
  testime: number;
  tesisactive: boolean;
  tesislocked: boolean;
  tesmaX_SCORE: number;
  tesnote: string;
  test_detail_list: [Test_Detail]
}

export interface TestResult {
  errorCode: number;
  errorMessage: string;
  data: Test;
}

@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor(private _http: HttpClient, private api: BaseapiService) { }
  getAll(): Observable<TestsResult> {
    return this._http.get<TestsResult>(this.api.url.test);
  }
  get(id): Observable<TestResult> {
    return this._http.get<TestResult>(`${this.api.url.test}/${id}`);
  }
  add(tes: Test): Observable<TestResult> {
    return this._http.post<TestResult>(this.api.url.test, tes);
  }
  put(tes: Test): Observable<TestResult> {
    return this._http.put<TestResult>(`${this.api.url.test}/${tes.id}`, tes);
  }
  delete(id): Observable<TestResult> {
    return this._http.delete<TestResult>(`${this.api.url.test}/${id}`);
  }
}
