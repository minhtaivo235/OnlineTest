import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseapiService {

  constructor() { }
  // baseUrlTest = 'http://www.saigontech.edu.vn/restful-api/';
  baseUrl = 'http://localhost:51830/api/';
  //  baseUrl = 'http://localhost:5000/api/';
  url = {
    // login: `${this.baseUrlTest}login.php`,
    // product: `${this.baseUrlTest}products.php`,
    // produc: `${this.baseUrlTest}product.php`,
    user: `${this.baseUrl}user`,
    usertype:`${this.baseUrl}user_type`,
    login: `${this.baseUrl}user/login`,
    subject: `${this.baseUrl}subject`,
    test_type: `${this.baseUrl}testtype`,
    lab: `${this.baseUrl}lab`,
    privilege:`${this.baseUrl}privilege`,
    part: `${this.baseUrl}part`,
    question: `${this.baseUrl}question`,
    answertype: `${this.baseUrl}answertype`,
    option: `${this.baseUrl}option`,
    semester: `${this.baseUrl}semester`,
    test: `${this.baseUrl}test`,
    taker: `${this.baseUrl}taker`,
    test_detail: `${this.baseUrl}testdetail`,
    group_test: `${this.baseUrl}grouptest`,
    group: `${this.baseUrl}group`
  }
}
