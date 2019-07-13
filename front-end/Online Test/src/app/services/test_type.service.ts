import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseapiService } from './baseapi.service';
import { Observable } from 'rxjs';



export interface Test_TypesResult {
  errorCode: Number;
  errorMessage: string;
  data: [Test_Type];
}

export interface Test_Type{
  id: number;
  testname: string;
  testiscurrent: boolean;
  testorder: number;
}

export interface Test_TypeResult {
  errorCode: Number;
  errorMessage: string;
  data: Test_Type;
}

@Injectable({
  providedIn: 'root'
})
export class TestTypeService {


  constructor(private _http: HttpClient, private api: BaseapiService) { }
  getAll(): Observable<Test_TypesResult>{
    return this._http.get<Test_TypesResult>(this.api.url.test_type);
  }
  get(id):Observable<Test_TypeResult>{
    return this._http.get<Test_TypeResult>(`${this.api.url.test_type}/${id}`);
  }
  add(tes: Test_Type): Observable<Test_TypeResult>{
    return this._http.post<Test_TypeResult>(this.api.url.test_type, tes);
  }
  put(tes: Test_Type): Observable<Test_TypeResult>{
    return this._http.put<Test_TypeResult>(`${this.api.url.test_type}/${tes.id}`, tes);
  }
  delete(id): Observable<Test_TypeResult>{
    return this._http.delete<Test_TypeResult>(`${this.api.url.test_type}/${id}`);
  }
}
