import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medication } from '../model/medication';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class MedicationService extends BaseService<Medication> {

  constructor(
    public http: HttpClient,
    public config: ConfigService,
  ) {
    super(http, config)
    this.entity = 'medications'
   }
}
