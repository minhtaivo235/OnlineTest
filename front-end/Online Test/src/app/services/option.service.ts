import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseapiService } from './baseapi.service';
import { Observable } from 'rxjs';

export interface Option{
  id: number;
  quE_ID: number;
  optcontent: string;
  optiscorrect: boolean;
}
export interface OptionsResult{
  errorCode: number;
  Massage: string;
  data: [Option];
}

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  constructor(private _http: HttpClient, private api: BaseapiService) { }

  get(id):Observable<OptionsResult>{
    return this._http.get<OptionsResult>(`${this.api.url.option}/${id}`);
  }
}
