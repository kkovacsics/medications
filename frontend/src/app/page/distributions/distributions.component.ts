import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Medication } from 'src/app/model/medication';
import { ConfigService } from 'src/app/service/config.service';
import { DistributionService } from 'src/app/service/distribution.service';
import { MedicationService } from 'src/app/service/medication.service';

@Component({
  selector: 'app-distributions',
  templateUrl: './distributions.component.html',
  styleUrls: ['./distributions.component.scss']
})
export class DistributionsComponent implements OnInit {

  columns = this.config.medicationColumns
  title = 'Gyógyszer kiosztás (1 heti adag)'
  list$: Observable<Medication[]> = this.getMedications()

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
