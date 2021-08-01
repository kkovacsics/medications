import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicine } from 'src/app/model/medicine';
import { ConfigService } from 'src/app/service/config.service';
import { MedicineService } from 'src/app/service/medicine.service';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.scss']
})
export class MedicinesComponent implements OnInit {

  tableColumns = this.config.medicineColumns
  title = 'Gyógyszerek'
  entity = 'medicine'
  list$: Observable<Medicine[]> = this.medicineService.get()

  constructor(
    private config: ConfigService,
    private medicineService: MedicineService
  ) { }

  ngOnInit(): void {
  }

  delete(item: Medicine) {
    this.medicineService.delete(item).subscribe(
      () => this.list$ = this.medicineService.get()
    )
  }

}
