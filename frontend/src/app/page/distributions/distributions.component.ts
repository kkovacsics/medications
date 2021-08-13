import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { Medication } from 'src/app/model/medication';
import { Medicine } from 'src/app/model/medicine';
import { Resident } from 'src/app/model/resident';
import { Stock } from 'src/app/model/stock';
import { ConfigService } from 'src/app/service/config.service';
import { DistributionService } from 'src/app/service/distribution.service';
import { MedicationService } from 'src/app/service/medication.service';
import { MedicineService } from 'src/app/service/medicine.service';
import { ResidentService } from 'src/app/service/resident.service';
import { StockService } from 'src/app/service/stock.service';

@Component({
  selector: 'app-distributions',
  templateUrl: './distributions.component.html',
  styleUrls: ['./distributions.component.scss']
})
export class DistributionsComponent implements OnInit {

  columns = this.config.medicationColumns
  title = 'Gyógyszer kiosztás (1 heti adag)'
  list$: Observable<Medication[]> = this.getMedications()

  residents: Resident[] = []
  medicines: Medicine[] = []
  stocks: Stock[] = []
  medications: Medication[] = []

  phrase = ''
  sortKey = 'residentName'
  sortAscending = true

  constructor(
    private config: ConfigService,
    private medicationService: MedicationService,
    private distributionService: DistributionService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  getMedications(): Observable<Medication[]> {
    return this.medicationService.get()
  }

  onSave(): void {
    this.distributionService.update().subscribe(
      response => this.router.navigate(['/']),
      err => console.log(`Error: ${JSON.stringify(err.error.message)}`)
    )
  }

  onColumnClick(key: string): void {
    if (this.sortKey === key) {
      this.sortAscending = !this.sortAscending
    } else {
      this.sortKey = key
      this.sortAscending = true
    }
  }

}
