// import { Injectable } from '@angular/core';
// import { BaseapiService } from './baseapi.service';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface ProductResult {
//   errorCode: Number;
//   errorMessage: string;
//   products: [Product];
// }
// export interface Product {
//   id: number;
//   code: string;
//   name: string;
//   unit: string;
//   price: number;
//   description: string;
// }
// export interface ProductsResult{
//   errorCode: Number;
//   errorMessage: string;
//   product: Product;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   // headers: HttpHeaders;
//   constructor(private api: BaseapiService, private _http: HttpClient) {
//     // const token: string = this.cookieservice.get('accessToken');
//     // this.headers = new HttpHeaders({
//     //   'Authorization': 'Bearer ' + token
//     // });
//   }
//   getAll(): Observable<ProductResult> {
//     return this._http.get<ProductResult>(this.api.url.product);
//   }
//   Delete(id: number): Observable<ProductsResult> {
//     return this._http.delete<ProductsResult>(`${this.api.url.produc}?id=${id}`);
//   }
//   add(product: Product): Observable<ProductsResult>{
//     return this._http.post<ProductsResult>(this.api.url.produc, product);
//   }
//   put(product: Product): Observable<ProductsResult>{
//     return this._http.put<ProductsResult>(`${this.api.url.produc}?id=${product.id}`, product);
//   }
//   get(id):Observable<ProductsResult>{
//     return this._http.get<ProductsResult>(`${this.api.url.product}?id=${id}`);
//   }
// }
