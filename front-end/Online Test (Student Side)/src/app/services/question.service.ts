import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseapiService } from './baseapi.service';
import { Observable } from 'rxjs';
import { Test_Detail } from './testdetail.service';

export interface QuestionsResult{
  errorCode: number;
  Message: string;
  data: [Question];
}
export interface Question{
  id: number;
  ansT_ID: number;
  ansT_NAME: string;
  paR_ID: number;
  paR_NAME: string;
  suB_ID: number;
  suB_NAME: string;
  quecontent: string;
  queisshuffle: boolean;
  quescore: number;
  quelevel: number;
  quereference: string;
  list_option: Option[];
}
export interface QuestionRequest{
  question: Question;
  options: Option[];
}
export interface Option{
  id: number;
  quE_ID: number;
  optcontent: string;
  optiscorrect: boolean;
}
export interface QuestionResult{
  errorCode: number;
  Message: string;
  data: Question;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http: HttpClient, private baseApi: BaseapiService) { }

  getAll(): Observable<QuestionsResult>{
    return this._http.get<QuestionsResult>(this.baseApi.url.question);
  }
  get(id): Observable<QuestionResult>{
    return this._http.get<QuestionResult>(`${this.baseApi.url.question}/${id}`);
  }
  getrdques(test_details: [Test_Detail]): Observable<QuestionsResult>{
    return this._http.post<QuestionsResult>(`${this.baseApi.url.question}/getrdquestion`,test_details);
  }
  add(question: QuestionRequest): Observable<QuestionResult>{
    return this._http.post<QuestionResult>(this.baseApi.url.question, question);
  }
  put(question: QuestionRequest): Observable<QuestionResult>{
    return this._http.put<QuestionResult>(`${this.baseApi.url.question}/${question.question.id}`, question);
  }
  delete(id): Observable<QuestionResult>{
    return this._http.delete<QuestionResult>(`${this.baseApi.url.question}/${id}`);
  }
}
