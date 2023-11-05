import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FrontendService {

  apiUrl = environment.apiUrl;

  constructor(
    protected http: HttpClient,
  ) {
  }

  getTariffs(consumption: any): Observable<any> {
    // const params = new HttpParams().set('consumption', consumption.toString());

    let params = new HttpParams();
    params = params.append('consumption', consumption);

    return this.http.get(this.apiUrl + '/product/calculate-cost', { params: params, observe: 'response' })
      .pipe((res) => res)
  }

  addNewProduct(product: any): Observable<any> {

    return this.http
      .post(this.apiUrl + '/product/insert-product', product, { observe: 'response' })
      .pipe((res) => res);
  }

  editProduct(product: any): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/product/update-product/${product.id}`, product, { observe: 'response' })
      .pipe((res) => res);
  }

  deleteProducts(productIds: any[]): Observable<any> {

    const data = { productIds };

    return this.http
      .post(`${this.apiUrl}/product/delete-products`, data, { observe: 'response' }) // Send the wrapped data
      .pipe((res) => res);
  }


  getAllProducts(): Observable<any> {

    return this.http.get(this.apiUrl + '/product/get-products', { observe: 'response' })
      .pipe((res) => res)
  }

  login(user: any): Observable<any> {
    return this.http
      .post(this.apiUrl + '/auth/login', user, { observe: 'response' })
      .pipe((res) => res);
  }

}
