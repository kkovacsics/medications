import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from '../model/stock';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class StockService extends BaseService<Stock> {

  constructor(
    public http: HttpClient,
    public config: ConfigService,
  ) {
    super(http, config)
    this.entity = 'stocks'
   }
}
