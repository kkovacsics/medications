import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DistributionService {

  constructor(
    public http: HttpClient,
    public config: ConfigService,
  ) { }
  
  update(): Observable<{}> {
    let url = `${this.config.apiUrl}distributions`
    return this.http.patch(url, '')
  }
}
