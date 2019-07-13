import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseapiService } from './baseapi.service';
import { Observable } from 'rxjs';

export interface GroupsResult {
  errorCode: Number;
  errorMessage: string;
  data: [Group];
}

export interface Group {
  id: number;
  laB_ID: number;
  seM_ID: number;
  suB_ID: number;
  grpid: string;
  grpname: string;
  grppassword: string;
  grpenC_PASSWORD: string;
  grpreV_PASSWORD: string;
  grP_ENC_PASSWORD: string;
  grpisactive: boolean;
  labname: string;
  semsemester: string;
  subname: string;
}

export interface GroupResult {
  errorCode: Number;
  errorMessage: string;
  data: Group;
}


@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient, private api: BaseapiService) { }

  getAll(): Observable<GroupsResult> {
    return this.http.get<GroupsResult>(this.api.url.group);
  }
  get(id): Observable<GroupResult> {
    return this.http.get<GroupResult>(`${this.api.url.group}/${id}`);
  }
  add(group: Group): Observable<GroupResult> {
    return this.http.post<GroupResult>(this.api.url.group, group);
  }
  put(group: Group): Observable<GroupResult> {
    return this.http.put<GroupResult>(`${this.api.url.group}/${group.id}`, group);
  }
  delete(id): Observable<GroupResult> {
    return this.http.delete<GroupResult>(`${this.api.url.group}/${id}`);
  }
}
