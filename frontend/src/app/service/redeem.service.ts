import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medication } from '../model/medication';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class RedeemService {

  constructor(
    public http: HttpClient,
    public config: ConfigService,
  ) { }
  
  get(): Observable<Medication[]> {
    let url = `${this.config.apiUrl}redeems`
    return this.http.get<Medication[]>(url)
  }

  update(week: {week: number}): Observable<{}> {
    let url = `${this.config.apiUrl}redeems`
    return this.http.patch(url, week)
  }
}
