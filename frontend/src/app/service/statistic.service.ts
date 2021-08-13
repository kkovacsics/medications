import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Statistic } from '../model/statistic';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  statistic$: BehaviorSubject<Statistic> = new BehaviorSubject<Statistic>(new Statistic())
  
  constructor(
    public http: HttpClient,
    public config: ConfigService,
  ) { }
  
  get(): void {
    let url = `${this.config.apiUrl}statistics`
    this.http.get<Statistic>(url).subscribe(
      statistic => this.statistic$.next(statistic)
    );
  }

}

