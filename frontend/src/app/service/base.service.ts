import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends {_id?: string}> {

  entity: string = ''

  constructor(
    public http: HttpClient,
    public config: ConfigService,
  ) { }

  get(id?: string | number): Observable<T[]> {
    let url = `${this.config.apiUrl}${this.entity}`;
    if (id) {
      url += `/${id}`;
    }
    return this.http.get<T[]>(url);
  }

  query(queryString: string): Observable<T[]> {
    const url = `${this.config.apiUrl}${this.entity}?${queryString}`;
    return this.http.get<T[]>(url);
  }

  update(item: T): Observable<T> {
    const url = `${this.config.apiUrl}${this.entity}/${item._id}`;
    return this.http.patch<T>(url, item);
  }

  create(item: T): Observable<T> {
    const url = `${this.config.apiUrl}${this.entity}`;
    return this.http.post<T>(url, item);
  }

  delete(item: T): Observable<T> {
    const url = `${this.config.apiUrl}${this.entity}/${item._id}`;
    return this.http.delete<T>(url);
  }
  
  mongoObjectId = () => {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp +
      'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16)).toLowerCase();
  }
  
}
