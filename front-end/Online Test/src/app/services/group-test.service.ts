import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseapiService } from './baseapi.service';
import { Observable } from 'rxjs';
import { Group } from './group.service';
import { Test } from './test.service';

export interface GroupTestsResult {
  errorCode: number;
  Message: string;
  data: [GroupTest];
}
export interface GroupTest {
  id: number;
  grP_ID: number;
  teS_ID: number;
  grptstatus: number;
  grptdate: Date;
  group_obj: Group;
  test_obj: Test;
}
export interface GroupTestResult {
  errorCode: number;
  Message: string;
  data: GroupTest;
}

@Injectable({
  providedIn: 'root'
})
export class GroupTestService {

  constructor(private _http: HttpClient, private baseapi: BaseapiService) { }

  getAll(): Observable<GroupTestsResult> {
    return this._http.get<GroupTestsResult>(this.baseapi.url.group_test);
  }
  get(id): Observable<GroupTestResult> {
    return this._http.get<GroupTestResult>(`${this.baseapi.url.group_test}/${id}`);
  }
  add(group_test: GroupTest): Observable<GroupTestResult>{
    return this._http.post<GroupTestResult>(`${this.baseapi.url.group_test}`, group_test);
  }
  put(group_test: GroupTest): Observable<GroupTestResult>{
    return this._http.put<GroupTestResult>(`${this.baseapi.url.group_test}/${group_test.id}`, group_test);
  }
  delete(id): Observable<GroupTestResult>{
    return this._http.delete<GroupTestResult>(`${this.baseapi.url.group_test}/${id}`);
  }
}
