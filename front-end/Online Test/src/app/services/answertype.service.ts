import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseapiService } from './baseapi.service';
import { Observable } from 'rxjs';

export interface AnswerTypesResult{
  errorCode: number;
  Message: string;
  data: [AnswerType]
}
export interface AnswerType{
  id: number;
  anstid: string;
  anstname: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnswertypeService {

  constructor(private _http: HttpClient, private baseApi: BaseapiService) { }

  getAll():Observable<AnswerTypesResult>{
    return this._http.get<AnswerTypesResult>(this.baseApi.url.answertype);
  }
}
