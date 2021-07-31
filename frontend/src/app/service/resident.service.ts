import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resident } from '../model/resident';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ResidentService extends BaseService<Resident> {

  constructor(
    public http: HttpClient,
    public config: ConfigService,
  ) {
    super(http, config)
    this.entity = 'residents'
   }
}
