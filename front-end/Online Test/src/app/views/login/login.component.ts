import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService, LoginRequest } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  message = '';
  loginreq: LoginRequest = {} as LoginRequest;
  // contructor
  constructor(private authservice: AuthService, private router: Router, private cookieservice: CookieService) { }

  login() {
    this.authservice.login(this.loginreq).subscribe(res => {
      if (res.errorCode === 0) {
        // console.log(res);
        // save info user
        this.cookieservice.set('Id', res.data.id.toString());
        this.cookieservice.set('Username', res.data.username);
        this.cookieservice.set('FirstName', res.data.firstname);
        this.cookieservice.set('LastName', res.data.lastname);
        this.cookieservice.set('token', res.data.token);
        // window.location.href = "/dashboard";
        this.router.navigate(['/dashboard']);
      }     else {
        this.message = res.errorMessage;
      }
    });

  }

  // init
  ngOnInit() {

  }

}
