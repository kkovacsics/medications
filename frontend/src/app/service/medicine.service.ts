import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicine } from '../model/medicine';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class MedicineService extends BaseService<Medicine>{

  constructor(
    public http: HttpClient,
    public config: ConfigService,
  ) {
    super(http, config)
    this.entity = 'medicines'
  }
}
