import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Medication } from 'src/app/model/medication';
import { Medicine } from 'src/app/model/medicine';
import { Resident } from 'src/app/model/resident';
import { ConfigService } from 'src/app/service/config.service';
import { MedicationService } from 'src/app/service/medication.service';
import { MedicineService } from 'src/app/service/medicine.service';
import { ResidentService } from 'src/app/service/resident.service';

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
    private residentService: ResidentService,
    private medicineService: MedicineService,
 ) { }

  ngOnInit(): void {
  }

  getMedications(): Observable<Medication[]> {
    return this.residentService.get()
      .pipe( tap( items => this.residents = items ) )
      .pipe( switchMap( () => this.medicineService.get() ) )
      .pipe( tap( items => this.medicines = items ) )
      .pipe( switchMap( () => this.medicationService.get() ) )
      .pipe( tap( items => {
          items.forEach( item => {
            const residentName = this.residents.find( resident => item.residentId===resident._id )?.name
            item.residentName = residentName? residentName: ''
            const medicineName = this.medicines.find( medicine => item.medicineId===medicine._id )?.name
            item.medicineName = medicineName? medicineName: ''
          } )
        })
      )
  }

  delete(item: Medication) {
    this.medicationService.delete(item).subscribe(
      () => this.list$ = this.getMedications()
    )
  }
}
