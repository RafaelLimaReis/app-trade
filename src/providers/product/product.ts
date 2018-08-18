import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigsApi } from '../ConfigsApi';

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider {

  private url: string = this.configs.url();
  private httpOptions;

  constructor(
    public http: HttpClient,
    private configs: ConfigsApi
  ) {
    this.httpOptions = this.configs.getHeaders();
  }

  listProducts(): Observable<any>{
    return this.http.get(`${this.url}products`, this.httpOptions);
  }

  likeProduct(product): Observable<any> {
    return this.http.post(`${this.url}wishes`, {id_product: product}, this.httpOptions);
  }

  deslikeProduct(product): Observable<any> {
    console.log(product);
    return this.http.delete(`${this.url}wishes/${product}`, this.httpOptions);
  }
}
