import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators'


@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(private cookieservice: CookieService, private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = this.cookieservice.get('token');
        const headers = new HttpHeaders({
            'Authorization': token
        });
        request = request.clone({
            headers: headers
        });
        return next.handle(request).pipe(tap(
            (event: HttpEvent<any>) => {},
            (error: HttpErrorResponse) => {
                if(this.router.url !== '/login' && (error.status === 401)){
                    this.router.navigate(['/login']);
                }
                return throwError(error);
            }
        ));
    }
}