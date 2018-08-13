import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigsApi } from '../ConfigsApi';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {

  private url: string = this.api.url();
  private httpOptions = this.api.getHeaders();

  constructor(
    public http: HttpClient,
    public api: ConfigsApi
  ) {}

  getChats(): Observable<any> {
    return this.http.get(`${this.url}messages`, this.httpOptions);
  }

}
