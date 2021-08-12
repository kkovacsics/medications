import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Medication } from 'src/app/model/medication';
import { Medicine } from 'src/app/model/medicine';
import { Resident } from 'src/app/model/resident';
import { ConfigService } from 'src/app/service/config.service';
import { MedicationService } from 'src/app/service/medication.service';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.scss']
})
export class MedicationsComponent implements OnInit {

  tableColumns = this.config.medicationColumns
  title = 'Gyógyszerezések'
  entity = 'medication'
  list$: Observable<Medication[]> = this.getMedications()

  residents: Resident[] = []
  medicines: Medicine[] = []

  constructor(
    private config: ConfigService,
    private medicationService: MedicationService,
 ) { }

  ngOnInit(): void {
  }

  getMedications(): Observable<Medication[]> {
    return this.medicationService.get()
  }

  delete(item: Medication) {
    this.medicationService.delete(item).subscribe(
      () => this.list$ = this.getMedications()
    )
  }
}
